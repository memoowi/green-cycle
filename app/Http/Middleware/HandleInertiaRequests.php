<?php

namespace App\Http\Middleware;

use App\Models\Business;
use App\Models\BusinessItem;
use App\Models\Item;
use App\Models\Location;
use App\Models\PickUp;
use App\Models\PickUpItem;
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
            'location' => null,
            'business' => null,
            'businesses' => Business::all(),
            'items' => Item::all(),
            'businessItems' => [],
            'pickupWaitList' => [],
            'pickupCanceledList' => [],
        ];

        // Check if there is an authenticated user
        if ($user = $request->user()) {
            $business = Business::where('user_id', $user->id)->first();
            $location = Location::where('user_id', $user->id)->first();
            $pickupWaitList = PickUp::with('pickupitem.item', 'location', 'paymentmethod')->where('user_id', $user->id)->whereIn('status', [1,3])->get();
            $pickupCanceledList = PickUp::with('pickupitem.item', 'location', 'paymentmethod')->where('user_id', $user->id)->whereIn('status', [2,4])->get();
            
            // Check if location is not null
            if ($location) {
                $authData['location'] = $location;
            }

            // Check if business is not null
            if ($business) {
                $businessItems = BusinessItem::where('business_id', $business->id)->get();
                $authData['business'] = $business;
                $authData['businessItems'] = $businessItems;
            }

            // Check if pickup is not null
            if ($pickupWaitList) {
                $authData['pickupWaitList'] = $pickupWaitList;
            }

            if ($pickupCanceledList) {
                $authData['pickupCanceledList'] = $pickupCanceledList;
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
