<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PhoneController;
use App\Http\Controllers\EmployeeController;

use App\Http\Middleware\AdminOnly;
use App\Http\Middleware\HROnly;

use App\Http\Controllers\attendanceController;
use App\Http\Controllers\HRController;

Route::get('/', function () {
    return Inertia::render('Public/Welcome');
});




Route::middleware('auth')->group(function () {
    Route::middleware(AdminOnly::class)->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('dashboard')->middleware(AdminOnly::class)->group(function () {
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::get('/employees', [EmployeeController::class, 'index'])->name('dashboard.employees.index');
        Route::post('/employees', [EmployeeController::class, 'create'])->name('dashboard.employees.store');
        Route::get('/employees/create', [EmployeeController::class, 'createForm'])->name('dashboard.employees.create');

        Route::get('/phones', [PhoneController::class, 'index'])->name('dashboard.phones.index');
        Route::post('/phones', [PhoneController::class, 'assign'])->name('dashboard.phones.assign');
        Route::delete('/phones', [PhoneController::class, 'destroy'])->name('dashboard.phones.destroy');
    })->middleware(AdminOnly::class);

    Route::prefix('hr')->middleware(HROnly::class)->group(function () {
        Route::get('/', [HRController::class, 'index'])->name('hr.index');
        Route::get('/attendance', [attendanceController::class, 'index'])->name('hr.attendance.index');
        Route::get('/attendance/get', [attendanceController::class, 'get'])->name('hr.attendance.get');
        Route::get('/attendance/get-sheet', [attendanceController::class, 'get_sheet'])->name('hr.attendance.get_sheet');
        Route::get('/attendance/get-users', [attendanceController::class, 'get_users'])->name('hr.attendance.get_users');
        Route::get('/attendance/sync', [attendanceController::class, 'syncAttendance'])->name('hr.attendance.sync');
    });
});

//public pages
Route::get('/phones', action: [PhoneController::class, 'publicIndex'])->name("public.phones");

require __DIR__ . '/auth.php';
