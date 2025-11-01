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

        if (!$usuario) {
            return response()->json(['erro' => 'usuario nao encontardo'], 404);
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
    public function etapa1(Request $request)
    {
        $usuario = new User();

        $usuario->nome = $request->inputNome;
        $usuario->email = $request->inputEmail;
        $usuario->nascimento = $request->inputNasci;
        $usuario->cep = $request->inputCep;
        $usuario->logra = $request->inputLogra;
        $usuario->numero = $request->inputNumero;
        $usuario->bairro = $request->inputBairro;
        $usuario->uf = $request->inputUf;
        $usuario->estado = $request->inputEstado;

          $imagem = $request->file('foto');

        if ($imagem) {
            $path = $imagem->store('imagens', 'public');
        } else {
            $path = "";
        }

        $usuario->img = $path;

        $usuario->save();

        return response()->json(
            [
                'messagme' => 'etapa1 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
    }

    public function etapa2(string $id,Request $request)
    {
       $usuario = User::find($id);

       $usuario->peso = $request->peso;
       $usuario->altura = $request->altura;
       $usuario->sangue = $request->sangue;
       $usuario->diabetico = $request->diabetico;
       $usuario->fumante = $request->fumante;
       $usuario->alcolatra = $request->alcolatra;

       $usuario->save();

       return response()->json(
        ['message' => 'etapa2 salvo com sucesso',
         'usuario' => $usuario
       ],
        200
       );
       
    }

    public function etapa3(string $id,Request $request)
    {
     
        $usuario = User::find($id);

        $usuario->bairro = $request->inputBairro;
        $usuario->uf = $request->inputUf;
        $usuario->estado = $request->inputEstado;

        $usuario->save();

        return response()->json(
            [
                'messagme' => 'etapa3 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
    }

    public function etapa4(string $id,Request $request)
    {
        $usuario = User::find($id);

      
        $usuario->save();

        return response()->json(
            [
                'messagme' => 'etapa4 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
    }
    public function etapa5(string $id,Request $request)
    {
        $usuario = User::find($id);

        $usuario->senha = Hash::make($request->inputSenha);

        $usuario->save();

        return response()->json(
            [
                'messagme' => 'etapa4 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
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

            return response()->json((
                [
                    'mensage' => 'login feito',
                    'user' => $usuario,
            
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
            "senha" => 'min:3'
        ]);



        $usuario = user::find($id);

        if (isset($validarDados['senha'])) {
            $validarDados['senha'] = Hash::make($validarDados['senha']);
        }



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
        $usuario = user::find($id)->delete();

        return response()->json(
            ['message' => 'apagado'],
            200
        );
    }
}
