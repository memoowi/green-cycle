<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Location/Edit');
    }
    
    public function update(Request $request): RedirectResponse
    {
        // things
        return Redirect::route('location.edit');
    }
}
