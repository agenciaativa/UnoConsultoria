<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Cases extends Model
{
    use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'text', 'filepath'];
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'cases';

	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];
}
