<?php

use App\Http\Controllers\BusinessController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/profile', [BusinessController::class, 'edit'])->name('profile');

Route::get('/dashboard', function () {
    return Inertia::render('Business/BusinessDashboard');
})->name('dashboard');

// Route::get('/settings', function () {
//     return Inertia::render('Business/BusinessSettings');
// })->name('settings');