<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/profile', function () {
    return Inertia::render('Business/BusinessProfile');
})->name('profile');

Route::get('/dashboard', function () {
    return Inertia::render('Business/BusinessDashboard');
})->name('dashboard');

// Route::get('/settings', function () {
//     return Inertia::render('Business/BusinessSettings');
// })->name('settings');