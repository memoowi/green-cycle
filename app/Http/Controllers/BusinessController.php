<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

    public function edit(): Response
    {
        return Inertia::render('Business/BusinessProfile');
    }

}

