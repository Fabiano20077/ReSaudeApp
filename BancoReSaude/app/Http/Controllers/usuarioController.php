<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Psy\Readline\Hoa\Console;

use function Laravel\Prompts\error;

class usuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $usuario = user::find($id);

        if(!$usuario) {
            return response()->json(['erro' => 'usuario nao encontardo'],404);
        }

        return response()->json(
            [
                'mensagem' => 'usuario encontrado',
                'user' => $usuario
            ]
        );
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
        } else {
            $path = $image->store('imagens', 'public');
        }

        $usuario->img = $path;

        $usuario->nascimento = $request->nascimentoInput;
        $usuario->sangue = $request->sangueInput;
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

            return response()->json((
                ['email ou senha incorretos']
            ), 404);
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

        $validarDados = $request->validate([
            "nome" => 'min:3',
            "email" => 'min:10',
            "nascimento" => 'min:3',
        ]);

        $usuario = user::find($id);

        $usuario->update($validarDados);



        return response()->json(
            [
                'mensagem' => 'update feito',
                'user' => $usuario
            ],
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
