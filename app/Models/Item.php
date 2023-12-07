<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = true;
    public function business() {
        return $this->belongsToMany(Business::class, 'business_item', 'item_id', 'business_id');
    }
    public function pickupitem(): HasMany
    {
        return $this->hasMany(PickupItem::class);
    }
}
