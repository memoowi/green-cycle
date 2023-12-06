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
Route::patch('/users/{user}/ban',[AdminController::class, 'banUser'])->name('users.ban');

Route::get('/items', [AdminController::class, 'items'])->name('items');
Route::get('/items/create', [AdminController::class, 'createItem'])->name('items.create');
Route::post('/items', [AdminController::class, 'storeItem'])->name('items.store');
Route::post('/items/{item}', [AdminController::class, 'updateItem'])->name('items.update');
Route::delete('/items/{item}/delete', [AdminController::class, 'deleteItem'])->name('items.delete');

Route::get('/facilities', [AdminController::class, 'facilities'])->name('recycle-facilities');
Route::patch('/facilities/{facility}/ban', [AdminController::class, 'banFacility'])->name('facilities.ban');
Route::patch('/facilities/{facility}/removePhotos', [AdminController::class, 'removeFacilityPhotos'])->name('facilities.removePhotos');

Route::get('/rewards', function () {
    return Inertia::render('Admin/RewardsAdmin');
})->name('rewards');

Route::get('/recycled-reports', function () {
    return Inertia::render('Admin/RecycledReportsAdmin');
})->name('recycled-reports');