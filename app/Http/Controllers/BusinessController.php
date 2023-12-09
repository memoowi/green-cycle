<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\BusinessItem;
use App\Models\PickUp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Business/CreateBusiness');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'business_name' => 'required|max:255',
            'province' => 'required',
            'regency' => 'required',
            'district' => 'required',
            'address' => 'required|max:255',
            'postal_code' => 'required|max:255',
            'business_number' => 'required|max:255',
            'business_email' => 'required|email|max:255',
        ]);

        $request->user()->business()->create($request->all());

        return Redirect::route('business.profile');
    }

    public function dashboard(): Response
    {
        return Inertia::render('Business/BusinessDashboard');
    }

    public function items(): Response
    {
        return Inertia::render('Business/BusinessItems');
    }
    public function storeItem(Request $request): RedirectResponse
    {
        // Validate the request data
        $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'item_id' => 'required|exists:items,id',
        ]);

        // Check if the item is already registered for the business
        $existingItem = BusinessItem::where('business_id', $request->input('business_id'))
            ->where('item_id', $request->input('item_id')) // Fix the field name here
            ->first();

        if ($existingItem) {
            // Item is already registered for the business, handle accordingly
            // You may want to return a response or redirect back with an error message
            return response()->json(['error' => 'Item is already registered for the business.']);
        }

        // Create a new BusinessItem record
        BusinessItem::create([
            'business_id' => $request->input('business_id'),
            'item_id' => $request->input('item_id'),
        ]);

        return Redirect::route('business.items');
    }

    public function deleteItem($businessItems): RedirectResponse
    {
        // dd($businessItems);
        $selectedItem = BusinessItem::findOrFail($businessItems);
        $selectedItem->delete();
        return Redirect::route('business.items');
    }


    public function edit(): Response
    {
        return Inertia::render('Business/BusinessProfile');
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'business_name' => 'required|max:255',
            'province' => 'required',
            'regency' => 'required',
            'district' => 'required',
            'address' => 'required|max:255',
            'postal_code' => 'required|max:255',
            'business_number' => 'required|max:255',
            'business_email' => 'required|email|max:255',
            'website_link' => 'nullable|url',
            'social_link1' => 'nullable|url',
            'social_link2' => 'nullable|url',
            'social_link3' => 'nullable|url',
        ]);
        // dd($request->all());


        $user = $request->user();
        $business = $user->business;

        if ($request->hasFile('business_photo')) {
            // Delete old profile photo
            if (Storage::exists('b-photos/' . $business->business_photo)) {
                Storage::delete('b-photos/' . $business->business_photo);
            }
            $filenamePhoto = time() . '_' . rand(1000, 9999) . 'p' . '.' . $request->business_photo->extension();
            $request->business_photo->storeAs('b-photos', $filenamePhoto);
            $business->business_photo = $filenamePhoto;
        }

        if ($request->hasFile('business_banner')) {
            // Delete old profile banner
            if (Storage::exists('b-photos/' . $business->business_banner)) {
                Storage::delete('b-photos/' . $business->business_banner);
            }
            $filenameBanner = time() . '_' . rand(1000, 9999) . 'b' . '.' . $request->business_banner->extension();
            $request->business_banner->storeAs('b-photos', $filenameBanner);
            $business->business_banner = $filenameBanner;
        }

        // dd($request->all());
        $business->update($request->except(['business_photo', 'business_banner']));

        return Redirect::route('business.profile');
    }

    public function setting(): Response
    {
        return Inertia::render('Business/BusinessSetting');
    }

    public function updateSetting(Request $request): RedirectResponse
    {
        $request->user()->business()->status = $request->status;
        $request->user()->business()->update($request->all());

        return Redirect::route('business.setting');
    }

    public function takeOrder(): Response
    {
        return Inertia::render('Business/TakeOrder');
    }

    public function picked($orders)
    {
        $selectedOrder = PickUp::findOrFail($orders);
        $selectedOrder->update(['status' => 3 ]);
    }
}
