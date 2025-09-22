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
            $table->id('idUsers');
            $table->string('nome')->nullable();
            $table->string('email')->nullable();
            $table->text('img')->nullable();
            $table->date('nascimento')->nullable();
            $table->char('sangue',2)->nullable();
            $table->string('alergia')->nullable();
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
