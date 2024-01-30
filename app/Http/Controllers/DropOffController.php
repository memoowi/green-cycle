<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DropOffController extends Controller
{
    public function dropOff(): Response
    {
        return Inertia::render('User/DropOff');
    }
}
