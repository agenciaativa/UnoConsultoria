<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'description', 'filepath', 'status'];
	
	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];
}
