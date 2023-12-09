<?php

use App\Http\Controllers\BannedController;
use App\Http\Controllers\BusinessController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [BusinessController::class, 'dashboard'])->name('dashboard');
Route::get('/items', [BusinessController::class, 'items'])->name('items');
Route::get('/profile', [BusinessController::class, 'edit'])->name('profile');
Route::get('/setting', [BusinessController::class, 'setting'])->name('setting');
Route::get('/take-order', [BusinessController::class, 'takeOrder'])->name('take-order');
Route::get('/outgoing-pickup', [BusinessController::class, 'outgoingPickUp'])->name('outgoing-pickup');

// only not-banned business can access
Route::middleware('business.is.ban')->group(function () {
    Route::post('/items/store/', [BusinessController::class, 'storeItem'])->name('items.store');
    Route::delete('/items/delete/{businessItems}', [BusinessController::class, 'deleteItem'])->name('items.delete');
    Route::post('/profile/update', [BusinessController::class, 'update'])->name('profile.update');
    Route::patch('/setting/update', [BusinessController::class, 'updateSetting'])->name('setting.update');
    Route::patch('/take-order/pick/{order}/{business}', [BusinessController::class, 'picked'])->name('take-order.pick');
    Route::patch('/outgoing-pickup/{order}/decline', [BusinessController::class, 'declineOrder'])->name('outgoing-pickup.decline');
    Route::patch('/outgoing-pickup/{order}/otw', [BusinessController::class, 'otw'])->name('outgoing-pickup.otw');
    Route::post('/outgoing-pickup/{order}/complete', [BusinessController::class, 'completeOrder'])->name('outgoing-pickup.complete');
});


// only banned business can access
Route::middleware('business.is.not.ban')->get('/banned-business', [BannedController::class, 'bannedBusiness'])->name('banned-business');
