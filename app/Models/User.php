<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'date_of_birth',
        'bio',
        'role',
        'type',
        'profile_photo',
        'website_link',
        'social_link1',
        'social_link2',
        'social_link3',
        'social_link4',
        'total_earned',
        'is_ban'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function location(): HasOne
    {
        return $this->hasOne(Location::class);
    }

    public function business(): HasOne
    {
        return $this->hasOne(Business::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($user) {
            // Check if the user's type is being set to 0
            if ($user->type == 0) {
                // Find the associated business and update its status to 0
                $business = $user->business;
                if ($business) {
                    $business->status = 0;
                    $business->save();
                }
            }
        });
    }

}
