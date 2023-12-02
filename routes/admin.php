<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/DashboardAdmin');
})->name('dashboard');

Route::get('/posts', function () {
    return Inertia::render('Admin/PostsAdmin');
})->name('posts');

Route::get('/users', [AdminController::class, 'users'])->name('users');
Route::patch('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
Route::patch('/users/{user}/photo', [AdminController::class, 'removePhoto'])->name('users.removephoto');

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