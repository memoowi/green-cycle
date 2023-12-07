<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DropOffItem extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function dropOff():BelongsTo
    {
        return $this->belongsTo(DropOff::class);
    }
    public function businessitem():BelongsTo
    {
        return $this->belongsTo(BusinessItem::class);
    }
}
