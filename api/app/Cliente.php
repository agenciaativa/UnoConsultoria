<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['text_clients'];
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'pg_clientes';

	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];
}
