<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentMethod extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function pickup():BelongsTo
    {
        return $this->belongsTo(Pickup::class);
    }
    public function dropoff():BelongsTo
    {
        return $this->belongsTo(DropOff::class);
    }
}
