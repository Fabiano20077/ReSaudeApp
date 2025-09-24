<?php

use Illuminate\Http\Request;
use App\Http\Controllers\usuarioController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/teste', function () {
    return response()->json(['status' => 'API rodando']);
});

Route::get('/chamar-usuario/{id}', [usuarioController::class, 'index']);

Route::post('/cadastra', [usuarioController::class, 'store']);

Route::post('/login', [usuarioController::class, 'show']);

Route::post('/update-dados/{id}', [usuarioController::class, 'update']);

Route::delete('/deleta-usuario/{id}', [usuarioController::class, 'destroy']);
