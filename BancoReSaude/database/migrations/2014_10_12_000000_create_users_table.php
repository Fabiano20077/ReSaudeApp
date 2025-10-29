<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_usuario', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->nullable();
            $table->string('email')->nullable();
            $table->text('img')->nullable();
            $table->date('nascimento')->nullable();
            $table->string('cep')->nullable();
            $table->string('logra')->nullable();
            $table->string('numero')->nullable();
            $table->string('bairro')->nullable();
            $table->string('uf')->nullable();
            $table->string('estado')->nullable();
            $table->integer('peso')->nullable();
            $table->integer('altura')->nullable();
            $table->json('alergia')->nullable();
            $table->string('sangue')->nullable();
            $table->string('senha')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
