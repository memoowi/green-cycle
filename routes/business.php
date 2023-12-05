<?php

use App\Http\Controllers\BusinessController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [BusinessController::class, 'dashboard'])->name('dashboard');

Route::get('/items', [BusinessController::class, 'items'])->name('items');
Route::post('/items/store/', [BusinessController::class, 'storeItem'])->name('items.store');
// Route::post('/items/update', [BusinessController::class, 'updateItem'])->name('items.update');
// Route::post('/items/delete', [BusinessController::class, 'deleteItem'])->name('items.delete');


Route::get('/profile', [BusinessController::class, 'edit'])->name('profile');
Route::post('/profile/update', [BusinessController::class, 'update'])->name('profile.update');

Route::get('/setting', [BusinessController::class, 'setting'])->name('setting');
Route::patch('/setting/update', [BusinessController::class, 'updateSetting'])->name('setting.update');


// Route::get('/settings', function () {
//     return Inertia::render('Business/BusinessSettings');
// })->name('settings');