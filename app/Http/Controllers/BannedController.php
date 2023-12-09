<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BannedController extends Controller
{
    public function bannedUser():Response
    {
        return Inertia::render('Banned/UserBanned');
    }
    public function bannedBusiness():Response
    {
        return Inertia::render('Banned/BusinessBanned');
    }
}
