<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Servicos extends Model
{
    use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title_item', 'text_item', 'image_item_path', 'link', 'position'];
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'pg_servicos_solucoes';
	
	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];
}
