<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class usuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuario = new user();

        $usuario->nome = $request->nomeInput;
        $usuario->email = $request->emailInput;

        $image = $request->file('foto');

        if ($image == null) {
            $path = "";
            return response()->json((
                ['erro imagem vazia']
            ));
        } else {
            $path = $image->store('imagens', 'public');
        }

        $usuario->img = $path;

        $usuario->nascimento = $request->nascimentoInput;
        $usuario->senha = bcrypt($request->senhaInput);

        $usuario->save();

        return response()->json([
            'message' => 'Usuário cadastrado com sucesso',
            'user' => $usuario
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $usuario = User::where('email', $request->loginEmail)->first();

        if (!$usuario || !Hash::check($request->LoginSenha, $usuario->senha)) {
            return response()->json(([
                'login invalido'
            ]));
        } else {

            $token = $usuario->createToken('auth_token')->plainTextToken;

            return response()->json((
                [
                    'mensage' => 'login feito',
                    'user' => $usuario,
                    'token' => $token
                ]
            ));
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
