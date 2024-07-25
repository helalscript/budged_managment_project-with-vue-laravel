<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function expense() {
        return $this->hasMany(Expense::class);
    }
    public function requisition()
    {
        return $this->morphOne(Requisition::class, 'requestable');
    }
    public function sanction()
    {
        return $this->morphOne(Sanction::class, 'sanctionable');
    }
}
