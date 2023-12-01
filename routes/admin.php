<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/DashboardAdmin');
})->name('dashboard');

Route::get('/posts', function () {
    return Inertia::render('Admin/PostsAdmin');
})->name('posts');

Route::get('/users', function () {
    return Inertia::render('Admin/UsersAdmin');
})->name('users');

Route::get('/items', function () {
    return Inertia::render('Admin/ItemsAdmin');
})->name('items');

Route::get('/facilities', function () {
    return Inertia::render('Admin/FacilitiesAdmin');
})->name('recycle-facilities');

Route::get('/rewards', function () {
    return Inertia::render('Admin/RewardsAdmin');
})->name('rewards');

Route::get('/recycled-reports', function () {
    return Inertia::render('Admin/RecycledReportsAdmin');
})->name('recycled-reports');