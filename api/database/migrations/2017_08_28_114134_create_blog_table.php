<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog', function (Blueprint $table) {
            $table->increments('id');
            $table->text('title_client');
            $table->text('title_tags');
            $table->text('tags_slug');
            $table->string('image_client_path');
            $table->text('resume');
            $table->text('description');
            $table->string('views')->default(1);
            $table->string('user');
            $table->string('slug');
            $table->dateTime('date_publish');
            $table->boolean('status')->default(1);
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
        Schema::dropIfExists('blog');
    }
}
