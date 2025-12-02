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

        if ($usuario && $usuario->img) {
            $usuario->img = asset('storage/' . $usuario->img);
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

    public function etapa2(string $id, Request $request)
    {
        $usuario = User::find($id);

        $usuario->peso = $request->peso;
        $usuario->altura = $request->altura;
        $usuario->sangue = $request->sangue;
        $usuario->diabetico = $request->diabetico;
        $usuario->fumante = $request->fumante;
        $usuario->alcolatra = $request->alcolatra;
        $usuario->alergia = json_decode($request->alergia);

        $usuario->save();

        return response()->json(
            [
                'message' => 'etapa2 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
    }

    public function etapa3(string $id, Request $request)
    {

        $usuario = User::find($id);

        $usuario->remedios = json_decode($request->remedios);

        $usuario->save();

        return response()->json(
            [
                'messagme' => 'etapa3 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
    }

    public function etapa4(string $id, Request $request)
    {
        $usuario = User::find($id);

        $usuario->doencas = json_decode($request->doencas);

        $usuario->save();

        return response()->json(
            [
                'messagme' => 'etapa4 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
    }

    public function etapa5(string $id, Request $request)
    {
        $usuario = User::find($id);

        $usuario->senha = Hash::make($request->inputSenha);

        $usuario->save();

        return response()->json(
            [
                'messagme' => 'etapa5 salvo com sucesso',
                'usuario' => $usuario
            ],
            200
        );
    }

    public function Update(string $id, Request $request)
    {

        $validarDados = $request->validate([
            'nome' => 'string',
            'email' => 'string',
            'nascimento' => 'date',
            'cep' => 'min: 8',
            'numero' => 'string',
            'bairro' => 'string',
            'uf' => 'string',
            'logra' => 'string',
            'peso' => 'min:2',
            'altura' => 'min:3',
            'sangue' => 'string',
            'diabetico' => 'string',
            'fumante' => 'string',
            'alcolatra' => 'string',
            'alergia' => 'json',
            'remedios' => 'json',
            'doencas' => 'json',
        ]);

        $usuario = User::find($id);


        if (!empty(trim($request->senhaA)) && !empty(trim($request->senhaN))) {

            if (!Hash::check($request->senhaA, $usuario->senha)) {

                return response()->json(
                    ['message' => 'senha antiga incorreta'],
                    403
                );
            }

            $validarDados['senha'] = Hash::make($request->senhaN);
        } else if (!empty(trim($request->senhaA)) || !empty(trim($request->senhaN))) {

            return response()->json(
                ['message' => 'Para alterar a senha, preencha ambos os campos'],
                400
            );
        }

        $validarDados['alergia'] = json_decode($request->alergia);
        $validarDados['remedios'] = json_decode($request->remedios);
        $validarDados['doencas'] = json_decode($request->doencas);



        $usuario->update($validarDados);

        return response()->json(
            [
                'messagme' => 'usuario atualizado com sucesso',
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

    public function fotoUsuario(Request $request, string $id)
    {
        $usuario = User::find($id);

        if ($request->hasFile('imgAdm')) {
            $file = $request->file('imgAdm');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('img'), $filename);
            $usuario->img = $filename;
        }

        $usuario->save();

        return response()->json(
            [
                'mensagem' => 'imagem enviada com sucesso',
                'admin' => $usuario
            ],
            200
        );
    }


    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /*     public function update(Request $request, string $id)
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
    } */

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
