<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function expenseSource() {
        return $this->belongsTo(ExpenseSource::class);
    }

    public function employee() {
        return $this->belongsTo(Employee::class);
    }

    public function vendor() {
        return $this->belongsTo(Vendor::class);
    }

    public function expenseCategory() {
        return $this->belongsTo(ExpenseCategory::class);
    }

    

    

    public function resanctionRequest()
    {
        return $this->morphMany(ResanctionRequest::class, 'requestable');
    }

    public function resanction()
    {
        return $this->morphMany(Resanction::class, 'sanctionable');
    }
}
