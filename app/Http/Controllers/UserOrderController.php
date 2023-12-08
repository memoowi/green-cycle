<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserOrderController extends Controller
{
    public function waitList():Response
    {
        return Inertia::render('User/OrderPanel/WaitList');
    }
}
