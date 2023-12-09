<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->date_of_birth = $request->input('date_of_birth');
        $request->user()->bio = $request->input('bio');

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's profile soical media links.
     */
    public function updateLink(Request $request): RedirectResponse
    {
        $request->validate([
            'website_link' => ['nullable', 'url'], 
            'social_link1' => ['nullable', 'url'], 
            'social_link2' => ['nullable', 'url'], 
            'social_link3' => ['nullable', 'url'], 
            'social_link4' => ['nullable', 'url']
        ]);
        $request->user()->website_link = $request->input('website_link');
        $request->user()->social_link1 = $request->input('social_link1');
        $request->user()->social_link2 = $request->input('social_link2');
        $request->user()->social_link3 = $request->input('social_link3');
        $request->user()->social_link4 = $request->input('social_link4');

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's account type.
     */
    public function updateType(Request $request): RedirectResponse
    {
        $request->user()->type = $request->input('type');

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's profile photo.
     */
    public function updatePhoto(Request $request): RedirectResponse
    {
        $request->validate(['profile_photo' => ['required', 'image']]);

        if ($request->hasFile('profile_photo')) {
            if (Storage::exists('profile-photos/' . $request->user()->profile_photo)) {   // Delete old profile photo
                Storage::delete('profile-photos/' . $request->user()->profile_photo);
            }
            $filename = time() . '_' . rand(1000, 9999) . '.' . $request->profile_photo->extension();
            $request->profile_photo->storeAs('profile-photos', $filename);
            // dd($request->all());

            $request->user()->profile_photo = $filename;
            $request->user()->save();
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function userProfile($user): Response
    {
        $profile = User::findOrFail($user);
        return Inertia::render('User/UserProfile', [
            'user' => $profile,
        ]);
    }

}
