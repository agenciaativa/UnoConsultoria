<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
	use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['text1', 'title_text2', 'header_text2', 'footer_text2', 'title_clients'];
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'pg_home';
	
	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];
}
