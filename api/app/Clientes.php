<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
	use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title_client', 'image_client_path', 'status'];
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'clientes';

	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];

	/**
	 * Get the Case record associated with the Cliente.
	 */
	public function case()
	{
		return $this->hasOne('App\Cases', 'cliente_id', 'id');
	}
}
