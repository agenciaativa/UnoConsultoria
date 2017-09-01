<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
	use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['text_empresa', 'text_empresa2'];
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'pg_empresa';

	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];
}
