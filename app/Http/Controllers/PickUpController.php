<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\PaymentMethod;
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
    public function addItem(Request $request, $pickUpId)
    {
        $request->validate([
            'item_id' => 'required',
            'weight' => 'required',
            'approx_earn' => 'required',
        ]);
        // dd($request->all());
        PickUpItem::create([
            'pick_up_id' => $pickUpId,
            'item_id' => $request->item_id,
            'weight' => $request->weight,
            'approx_earn' => $request->approx_earn,
        ]);
    }
    public function afterItems($pickUpId): RedirectResponse
    {
        $encodedPickUpId = Hashids::encode($pickUpId);
        // dd($encodedPickUpId);
        return Redirect::route('user.pick-up.upload-photo', ['pickUpId' => $encodedPickUpId]);
    }
    public function uploadPhoto($pickUpId):Response
    {
        // dd($pickUpId);
        $id = Hashids::decode($pickUpId)[0];
        return Inertia::render('User/UploadPhotoPickUp', [
            'pickUpId' => $id,
        ]);
    }
    public function storePhoto(Request $request, $pickUpId):RedirectResponse
    {
        // dd($request->all());
        $request->validate([
            'photo' => 'required',
        ]);
        $pickUp = PickUp::findOrFail($pickUpId);

        // Store the photo
        $filename = 'pick-up-' . time() . '-' . rand(1000, 9999) . '.' . $request->photo->extension();
        $request->file('photo')->storeAs('pick-up-photos', $filename);
        $pickUp->update([
            'photo' => $filename,
        ]);

        $encodedPickUpId = Hashids::encode($pickUpId);
        return Redirect::route('user.pick-up.choose-payment', ['pickUpId' => $encodedPickUpId]);
    }
    public function choosePayment($pickUpId):Response
    {
        $id = Hashids::decode($pickUpId)[0];
        return Inertia::render('User/ChoosePaymentPickUp', [
            'pickUpId' => $id,
        ]);
    }
    public function payment(Request $request, $pickUpId):RedirectResponse
    {
        $request->validate([
            'type' => 'required',
        ]);

        PaymentMethod::create([
            'pick_up_id' => $pickUpId,
            'type' => $request->type,
            'account_name' => $request->account_name,
            'account_number' => $request->account_number,
        ]);

        $pickUp = PickUp::findOrFail($pickUpId);
        $pickUp->update([
            'status' => 1,
        ]);
        
        $encodedPickUpId = Hashids::encode($pickUpId);
        return Redirect::route('user.pick-up.success', ['pickUpId' => $encodedPickUpId]);
    }
    public function successPickUp($pickUpId):Response
    {
        $id = Hashids::decode($pickUpId)[0];
        return Inertia::render('User/SuccessPickUp', [
            'pickUpId' => $id,
        ]);
    }
}
