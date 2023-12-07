<?php

use App\Http\Controllers\PickUpController;
use Illuminate\Support\Facades\Route;

//PICKUP
Route::get('/pick-up',[PickUpController::class,'pickUp'])->name('pick-up.set-location');
Route::post('/pick-up/create',[PickUpController::class,'create'])->name('pick-up.create');
Route::get('/pick-up/{pickUpId}/add-items',[PickUpController::class,'addItems'])->name('pick-up.add-items');
Route::delete('/pick-up/add-items/remove-item={itemId}',[PickUpController::class,'removeItem'])->name('pick-up.add-items.remove-item');