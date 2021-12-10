<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class);
Route::apiResource('products', \App\Http\Controllers\ProductController::class);

Route::post('login', [\App\Http\Controllers\Api\UserController::class, 'login']);
Route::post('register', [\App\Http\Controllers\Api\UserController::class, 'register']);
Route::post('logout', [\App\Http\Controllers\Api\UserController::class, 'logout'])->middleware('auth:sanctum');


Route::group(['prefix' => 'books', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/', [\App\Http\Controllers\Api\BookController::class, 'index']);
    Route::post('store', [\App\Http\Controllers\Api\BookController::class, 'store']);
    Route::get('edit/{id}', [\App\Http\Controllers\Api\BookController::class, 'edit']);
    Route::post('update/{id}', [\App\Http\Controllers\Api\BookController::class, 'update']);
    Route::delete('delete/{id}', [\App\Http\Controllers\Api\BookController::class, 'delete']);
});
