<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('categories/{id}', [CategoryController::class, 'show']);
    Route::post('categories/{id}',[CategoryController::class,'update']);
    Route::delete('categories/{id}',[CategoryController::class,'destroy']);
    Route::post('categories', [CategoryController::class, 'store']);
    // Route::resource('categories',CategoryController::class);

});
Route::resource('brands',BrandController::class);
