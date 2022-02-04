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

Route::post('login', [\App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
Route::post('register', [\App\Http\Controllers\Api\Auth\RegisterController::class, 'register']);
Route::post('logout', [\App\Http\Controllers\Api\Auth\LoginController::class, 'logout'])->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('user', function (Request $request) {
       return $request->user();
    });

    Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class)
        ->except('show', 'create', 'edit');

    Route::apiResource('users', \App\Http\Controllers\Api\UserController::class)
        ->except('show', 'create', 'edit');

    Route::apiResource('events', \App\Http\Controllers\Api\EventController::class);

    Route::apiResource('posts', \App\Http\Controllers\Api\PostController::class);
});
