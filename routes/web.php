<?php

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile2', [ProfileController::class, 'updateLink'])->name('profile.updatelink');
    Route::patch('/profile3', [ProfileController::class, 'updateType'])->name('profile.updatetype');
    Route::patch('/profile4', [ProfileController::class, 'updatePhoto'])->name('profile.updatephoto');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Route::get('/admin', function () {
//     return Inertia::render('Admin/DashboardAdmin');
// })->middleware(['auth', 'verified'])->name('admin');

Route::prefix('/admin')->middleware(['auth','admin'])->name('admin.')->group(function () {
    require __DIR__.'/admin.php';
});

// Route::prefix('/')->middleware(['auth','user'])->name('user.')->group(function () {
//     require __DIR__.'/user.php';
// });
