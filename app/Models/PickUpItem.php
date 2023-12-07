<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PickUpItem extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function pickUp(): BelongsTo
    {
        return $this->belongsTo(PickUp::class);
    }
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
