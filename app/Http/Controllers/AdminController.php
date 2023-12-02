<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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
}
