<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\PickUp;
use App\Models\PickUpItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Vinkla\Hashids\Facades\Hashids;

class PickUpController extends Controller
{
    public function pickUp(): Response
    {
        return Inertia::render('User/PickUp');
    }
    public function create(): RedirectResponse
    {
        $pickUp = PickUp::create([
            'user_id' => auth()->user()->id,
            'location_id' => Location::where('user_id', auth()->user()->id)->first()->id,
        ]);

        $hashedPickUpId = Hashids::encode($pickUp->id);

        // Redirect to the addItems route and pass the pickUpId
        return Redirect::route('user.pick-up.add-items', ['pickUpId' => $hashedPickUpId]);
    }
    public function addItems($pickUpId)
    {
        $id = Hashids::decode($pickUpId)[0];

        // Retrieve the PickUp model by its ID
        $pickUp = PickUp::findOrFail($id);

        // Retrieve the related PickUpItems for the given PickUp
        $pickUpItems = $pickUp->pickupitem;

        return Inertia::render('User/ChooseItemPickUp', [
            'pickUpId' => $id,
            'pickUpItems' => $pickUpItems,
        ]);
    }
    public function removeItem($itemId)
    {
        PickUpItem::where('id', $itemId)->delete();
    }
}
