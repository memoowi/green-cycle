<?php

namespace App\Http\Middleware;

use App\Models\Business;
use App\Models\BusinessItem;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $authData = [
            'user' => $request->user(),
            'users' => User::all(),
            'business' => null,
            'items' => Item::all(),
            'businessItems' => [],
        ];

        // Check if there is an authenticated user
        if ($user = $request->user()) {
            $business = Business::where('user_id', $user->id)->first();

            // Check if business is not null
            if ($business) {
                $businessItems = BusinessItem::where('business_id', $business->id)->get();
                $authData['business'] = $business;
                $authData['businessItems'] = $businessItems;
            }
        }

        return [
            ...parent::share($request),
            'auth' => $authData,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
