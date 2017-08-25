<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHomeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pg_home', function (Blueprint $table) {
            $table->increments('id');
            $table->text('text1');
            $table->string('title_text2');
            $table->text('header_text2');
            $table->text('footer_text2');
            $table->string('title_clients');
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
        Schema::dropIfExists('pg_home');
    }
}
