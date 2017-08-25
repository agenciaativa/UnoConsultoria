<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicosSolucoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pg_servicos_solucoes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title_item');
            $table->text('text_item');
            $table->string('image_item_path');
            $table->string('link');
            $table->integer('position');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pg_servicos_solucoes');
    }
}
