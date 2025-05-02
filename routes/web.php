<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PhoneController;
use App\Http\Controllers\EmployeeController;

Route::get('/', function () {
    return Inertia::render('Public/Welcome');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::prefix('dashboard')->group(function () {
        Route::get('/employees', [EmployeeController::class, 'index'])->name('dashboard.employees.index');
        Route::post('/employees', [EmployeeController::class, 'create'])->name('dashboard.employees.store');
        Route::get('/employees/create', [EmployeeController::class, 'createForm'])->name('dashboard.employees.create');

        Route::get('/phones', [PhoneController::class, 'index'])->name('dashboard.phones.index');
        Route::post('/phones', [PhoneController::class, 'assign'])->name('dashboard.phones.assign');
        Route::delete('/phones', [PhoneController::class, 'destroy'])->name('dashboard.phones.destroy');
    });
});

//public pages
Route::get('/phones', action: [PhoneController::class, 'publicIndex'])->name("public.phones");

require __DIR__ . '/auth.php';
