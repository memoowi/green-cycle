<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PickUp extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function pickupitem(): HasMany
    {
        return $this->hasMany(PickUpItem::class);
    }
    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
    public function paymentmethod(): HasOne
    {
        return $this->hasOne(PaymentMethod::class);
    }
}
