<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('get-latest-products', [FrontProductController::class, 'latestProducts']);
Route::get('get-featured-products', [FrontProductController::class, 'featuredProducts']);

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::resource('categories',CategoryController::class);
    Route::resource('brands',BrandController::class);
    Route::get('sizes',[SizeController::class,'index']);
    Route::resource('products',ProductController::class);
    Route::post('temp-image',[TempImageController::class,'store']);
    Route::post('save-product-image',[ProductController::class,'saveProductImage']);
    Route::get('change-product-default-image',[ProductController::class,'updateDefaultImage']);
    Route::delete('delete-product-image/{id}',[ProductController::class,'deleteProductImage']);

});
