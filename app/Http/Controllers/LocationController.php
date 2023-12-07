<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    public function edit(): Response
    {
        $user = auth()->user(); // Assuming you are using authentication
        $location = Location::where('user_id', $user->id)->first();

        return Inertia::render('Location/Edit', [
            'location' => $location
        ]);
    }
    
    public function update(Request $request)
    {
        
        $request->validate([
            
            'province' => 'required',
            'regency' => 'required',
            'district' => 'required',
            'address' => 'required',
            'postal_code' => 'required',
            'phone_number' => 'required',
            
        ]);
        
        // dd($request->all());

        $request->user()->location()->update($request->all());
    }
}
