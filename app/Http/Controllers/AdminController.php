<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function users(): Response
    {
        return Inertia::render('Admin/UsersAdmin');
    }
    public function updateUser(Request $request, $user)
    {
        // dd($request->all());
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'role' => ['required'],
            'type' => ['required'],
            'bio' => ['nullable', 'string'],
            'website_link' => ['nullable', 'url'],
            'social_link1' => ['nullable', 'url'],
            'social_link2' => ['nullable', 'url'],
            'social_link3' => ['nullable', 'url'],
            'social_link4' => ['nullable', 'url'],
            'total_earned' => ['required', 'numeric'],
        ]);

        // dd($request->all());
        $selectedUser = User::findOrFail($user);
        $selectedUser->update($request->all());
    }

    public function removePhoto($user)
    {
        $selectedUser = User::findOrFail($user);
        if(Storage::exists('profile-photos/' . $selectedUser->profile_photo)){
            Storage::delete('profile-photos/' . $selectedUser->profile_photo);
        }
        $selectedUser->update(['profile_photo' => null]);
    }

    public function banUser($user)
    {
        $selectedUser = User::findOrFail($user);
        $selectedUser->update(['is_ban' => !$selectedUser->is_ban]);
    }

    public function items(): Response
    {
        return Inertia::render('Admin/ItemsAdmin');
    }

    public function createItem(): Response
    {
        return Inertia::render('Admin/CreateItem');
    }

    public function storeItem(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'item_image' => ['required'],
        ]);

        $filename = 'item-' . time() . '-' . rand(1000, 9999) . '.' . $request->item_image->extension();
        $request->file('item_image')->storeAs('item-images', $filename);

        Item::create([
            'name' => $request->name,
            'price' => $request->price,
            'item_image' => $filename,
        ]);

        return Redirect::route('admin.items');
    }

    public function updateItem(Request $request, $item)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:items,name,' . $item],
            'price' => ['required', 'numeric'],
            'item_image' => ['required'],
        ]);
    
        $selectedItem = Item::findOrFail($item);
        // Check if the request has a new image
        if ($request->hasFile('item_image')) {
            // Delete the old image
            if (Storage::exists('item-images/' . $selectedItem->item_image)) {
                Storage::delete('item-images/' . $selectedItem->item_image);
            }
            // Store the new image
            $filename = 'item-' . time() . '-' . rand(1000, 9999) . '.' . $request->item_image->extension();
            $request->file('item_image')->storeAs('item-images', $filename);
            $selectedItem->update(['item_image' => $filename]);
        }
    
        // Update other fields (excluding item_image) from the request
        $selectedItem->update($request->except('item_image'));
    }
    
    public function deleteItem($item)
    {
        $selectedItem = Item::findOrFail($item);
        if(Storage::exists('item-images/' . $selectedItem->item_image)){
            Storage::delete('item-images/' . $selectedItem->item_image);
        }
        $selectedItem->delete();
    }

    public function facilities(): Response
    {
        return Inertia::render('Admin/FacilitiesAdmin');
    }

    public function banFacility($facility)
    {
        $selectedFacility = Business::findOrFail($facility);
        $selectedFacility->update(['is_ban' => !$selectedFacility->is_ban]);
    }

    public function removeFacilityPhotos($facility)
    {
        $selectedFacility = Business::findOrFail($facility);
        if(Storage::exists('b-photos/' . $selectedFacility->business_photo)){
            Storage::delete('b-photos/' . $selectedFacility->business_photo);
        }
        if(Storage::exists('b-photos/' . $selectedFacility->business_banner)){
            Storage::delete('b-photos/' . $selectedFacility->business_banner);
        }

        $selectedFacility->update(['business_photo' => null, 'business_banner' => null]);
    }
}
