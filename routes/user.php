<?php

use App\Http\Controllers\PickUpController;
use Illuminate\Support\Facades\Route;

Route::get('/pick-up',[PickUpController::class,'pickUp'])->name('pick-up');