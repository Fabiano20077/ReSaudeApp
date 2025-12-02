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

Route::post('/cadastra-etapa1', [usuarioController::class, 'etapa1']);
Route::post('/cadastra-etapa2/{id}', [usuarioController::class, 'etapa2']);
Route::post('/cadastra-etapa3/{id}', [usuarioController::class, 'etapa3']);
Route::post('/cadastra-etapa4/{id}', [usuarioController::class, 'etapa4']);
Route::post('/cadastra-etapa5/{id}', [usuarioController::class, 'etapa5']);
Route::post('/updatePerfil/{id}', [usuarioController::class, 'Update']);

Route::post('/update-img/{id}', [usuarioController::class, 'fotoUsuario']);

Route::post('/login', [usuarioController::class, 'show']);

Route::post('/update-dados/{id}', [usuarioController::class, 'update']);

Route::delete('/deleta-usuario/{id}', [usuarioController::class, 'destroy']);
