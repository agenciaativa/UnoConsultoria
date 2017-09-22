<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class BlogGallery extends Model
{
    use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['blog_id', 'filepath', 'thumbnail'];
	

	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'blog_gallery';


	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['updated_at'];

	/**
	 * Get the Cliente that owns the Case.
	 */
	public function blog()
	{
		return $this->belongsTo('App\Blog', 'blog_id', 'id');
	}
}
