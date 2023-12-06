<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function items() {
        return $this->hasMany(Item::class, 'business_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::saving(function ($business) {
            if($business->is_ban == 1) {
                if($business->status != 0) {
                    $business->status = 0;
                }
            }
        });
    }
}
