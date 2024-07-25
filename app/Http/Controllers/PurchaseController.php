<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends Controller
{
     use ApiResponse;

    public function index()
    {
        $purchase = Purchase::with(["vendor"=>function($q){
            return $q->with('people');
        }])->with(["product"=>function($q){
            return $q->with('productCategory');
        }])->orderBy('id','desc')->get();
        return $this->sendResponse($purchase,'Purchases list fetched successfully!');

    }

    public function create()
    {
        //
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'unit' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'vendor_id' => 'required',
            'bill_number' => 'required',
            'voucher_number' => 'required',
            'date' => 'required',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(),422);
        }
        $input = $request->all();
        $purchase = Purchase::create($input);
        return $this->sendResponse($purchase, 'Purchase created successfully!');
    }


    public function show(string $id)
    {
       $purchase=Purchase::find($id);
       return $this->sendResponse($purchase,'Purchase fetched successfully!');
    }


    public function edit(string $id)
    {
        $purchase=Purchase::find($id);
        return $this->sendResponse($purchase,'Purchase fetched successfully!');
    }


    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'unit' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'vendor_id' => 'required',
            'bill_number' => 'required',
            'voucher_number' => 'required',
            'date' => 'required',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(),422);
        }
        $input = $request->all();
        if(!empty($request->product_id)){
            $input['product_id']=($request->product_id);
        }
        $purchase = Purchase::findOrFail($id)->update($input);
        return $this->sendResponse($purchase, 'Purchase updated successfully!');
    }


    public function destroy(string $id)
    {
        $purchase=Purchase::find($id)->delete();
        return $this->sendResponse($purchase,'Purchase deleted successfully!');
    }
}
