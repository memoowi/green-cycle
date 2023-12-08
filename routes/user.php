<?php

use App\Http\Controllers\PickUpController;
use Illuminate\Support\Facades\Route;

//PICKUP
Route::get('/pick-up',[PickUpController::class,'pickUp'])->name('pick-up.set-location');
Route::post('/pick-up/create',[PickUpController::class,'create'])->name('pick-up.create');
Route::get('/pick-up/{pickUpId}/add-items',[PickUpController::class,'addItems'])->name('pick-up.add-items');
Route::delete('/pick-up/add-items/remove-item={itemId}',[PickUpController::class,'removeItem'])->name('pick-up.add-items.remove-item');
Route::post('/pick-up/add-items/add-item={pickUpId}',[PickUpController::class,'addItem'])->name('pick-up.add-items.add-item');
Route::get('/pick-up/{pickUpId}/after-items',[PickUpController::class,'afterItems'])->name('pick-up.after-items');
Route::get('/pick-up/{pickUpId}/upload-photo',[PickUpController::class,'uploadPhoto'])->name('pick-up.upload-photo');
Route::post('/pick-up/{pickUpId}/uploading-photo',[PickUpController::class,'storePhoto'])->name('pick-up.uploading-photo');
Route::get('/pick-up/{pickUpId}/choose-payment',[PickUpController::class,'choosePayment'])->name('pick-up.choose-payment');
// Route::post('/pick-up/{pickUpId}/payment',[PickUpController::class,'payment'])->name('pick-up.payment');