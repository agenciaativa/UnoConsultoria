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
	protected $fillable = ['cliente_id', 'title', 'description', 'text', 'filepath', 'thumbnail', 'slug'];
	
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
	protected $hidden = ['updated_at'];

	/**
	 * Get the Cliente that owns the Case.
	 */
	public function cliente()
	{
		return $this->belongsTo('App\Clientes', 'cliente_id', 'id');
	}
}
