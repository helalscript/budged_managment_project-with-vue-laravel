<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('admin')->group(function(){
    Route::resource('users',UserController::class)->names('users');
});
Route::middleware('auth:sanctum')->prefix('helal')->group(function(){
    Route::resource('purchases',PurchaseController::class)->names('purchases');
});

// testing purpose create 2 controller and route...........................
Route::prefix('helalv')->group(function(){
    Route::resource('vendors',VendorController::class)->names('vendors');
});
Route::prefix('helalp')->group(function(){
    Route::resource('products',ProductController::class)->names('products');
});
// testing purpose create 2 controller and route...........................


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',[LoginController::class,'login']);
Route::post('logout',[LoginController::class,'logout'])->middleware('auth:sanctum');
