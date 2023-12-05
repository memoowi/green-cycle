<?php

use App\Http\Controllers\BusinessController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ROUTE GAJE 
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route yang butuh login
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile2', [ProfileController::class, 'updateLink'])->name('profile.updatelink');
    Route::patch('/profile3', [ProfileController::class, 'updateType'])->name('profile.updatetype');
    Route::post('/profile4', [ProfileController::class, 'updatePhoto'])->name('profile.updatephoto');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/location', [LocationController::class, 'edit'])->name('location.edit');
    Route::patch('/location/update', [LocationController::class, 'update'])->name('location.update');
});

// Route per-regist-login-an-logout jg 
require __DIR__.'/auth.php';

// Route Admin Only
Route::prefix('/admin')->middleware(['auth','admin'])->name('admin.')->group(function () {
    require __DIR__.'/admin.php';
});

// Route Business Only
Route::prefix('/business')->middleware(['auth','business'])->name('business.')->group(function () {
    require __DIR__.'/business.php';
});

//Route Create Business klo belum exist
Route::prefix('/business/register')->middleware(['auth','business.exist'])->name('business.new.')->group(function () {
    Route::get('/', [BusinessController::class, 'create'])->name('create');
    Route::post('/', [BusinessController::class, 'store']);
});

