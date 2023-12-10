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
            'takeOrders' => [],
            'outgoingPickups' => [],
            'takenOrders' => [],
            'pickupOnTheWayList' => [],
            'pickupCompletedList' => [],
            'reportsAdmin' => [],
            
            
        ];

        // Check if there is an authenticated user
        if ($user = $request->user()) {
            $business = Business::where('user_id', $user->id)->first();
            $location = Location::where('user_id', $user->id)->first();
            $pickupWaitList = PickUp::with('business','pickupitem.item', 'location', 'paymentmethod')->where('user_id', $user->id)->whereIn('status', [1,3])->get();
            $pickupCanceledList = PickUp::with('business','pickupitem.item', 'location', 'paymentmethod')->where('user_id', $user->id)->whereIn('status', [2,4])->get();
            $pickupOnTheWayList = PickUp::with('business','pickupitem.item', 'location', 'paymentmethod')->where('user_id', $user->id)->whereIn('status', [5])->get();
            $pickupCompletedList = PickUp::with('business','pickupitem.item', 'location', 'paymentmethod')->where('user_id', $user->id)->whereIn('status', [6])->get();

            $reportsAdmin = PickUp::with('user','business','pickupitem.item', 'location', 'paymentmethod')->whereIn('status', [2,3,4,5,6])->get();
            
            
            // Check if location is not null
            if ($location) {
                $authData['location'] = $location;
            }
            
            // Check if business is not null
            if ($business) {
                $businessItems = BusinessItem::where('business_id', $business->id)->get();
                $takeOrders = PickUp::with('user', 'pickupitem.item', 'location', 'paymentmethod')->where('business_id', null)->whereIn('status', [1])->whereHas('location', function($q) use ($business) {$q->where('regency', $business->regency);})->get();
                $outgoingPickups = PickUp::with('user', 'pickupitem.item', 'location', 'paymentmethod')->where('business_id', $business->id)->whereIn('status', [3,5])->get();
                $takenOrders = PickUp::with('user', 'pickupitem.item', 'location', 'paymentmethod')->where('business_id', $business->id)->whereIn('status', [4,6])->get();
                $authData['business'] = $business;
                $authData['businessItems'] = $businessItems;
                $authData['takeOrders'] = $takeOrders;
                $authData['outgoingPickups'] = $outgoingPickups;
                $authData['takenOrders'] = $takenOrders;
            }

            if ($pickupWaitList) {
                $authData['pickupWaitList'] = $pickupWaitList;
            }

            if ($pickupCanceledList) {
                $authData['pickupCanceledList'] = $pickupCanceledList;
            }

            if ($pickupOnTheWayList) {
                $authData['pickupOnTheWayList'] = $pickupOnTheWayList;
            }

            if ($pickupCompletedList) {
                $authData['pickupCompletedList'] = $pickupCompletedList;
            }
            
            if ($reportsAdmin) {
                $authData['reportsAdmin'] = $reportsAdmin;
            }
        }

        return [
            ...parent::share($request),
            'landingItems' => Item::take(7)->get(),
            'auth' => $authData,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
