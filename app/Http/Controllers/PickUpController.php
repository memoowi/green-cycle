<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PickUpController extends Controller
{
    public function pickUp():Response
    {
        return Inertia::render('PickUp');
    }
}
