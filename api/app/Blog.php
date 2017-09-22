<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title_client', 'title_tags', 'tags_slug', 'image_client_path', 'resume', 'description', 'status', 'date_publish', 'views', 'user', 'slug'];
	
	/**
	 * The table associated with the model.
	 *
	 * @var string
	 */
	protected $table = 'blog';

	/**
	 * The attributes that are hidden.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];


	/**
	 * Get the Blog Gallery record associated with the Blog.
	 */
	public function gallery()
	{
		return $this->hasMany('App\BlogGallery', 'blog_id', 'id');
	}

}
