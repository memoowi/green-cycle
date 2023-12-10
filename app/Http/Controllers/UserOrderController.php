<?php

namespace App\Http\Controllers;

use App\Models\PickUp;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserOrderController extends Controller
{
    public function waitList():Response
    {
        return Inertia::render('User/OrderPanel/WaitList');
    }
    
    public function cancelOrder($id)
    {
        PickUp::findOrFail($id)->update([
            'status' => 2   // 2 = cancel
        ]);
    }
    
    public function canceledList():Response
    {
        return Inertia::render('User/OrderPanel/CanceledList');
    }

    public function otwList():Response
    {
        return Inertia::render('User/OrderPanel/OtwList');
    }

    public function completedList():Response
    {
        return Inertia::render('User/OrderPanel/CompletedList');
    }
}
