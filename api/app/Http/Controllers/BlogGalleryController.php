<?php

namespace App\Http\Controllers;

use App\BlogGallery;
use Illuminate\Http\Request;

class BlogGalleryController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$gallery = BlogGallery::with('blog')->get();
		return response()->json(['gallery' => $gallery, 'message' => '']);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\BlogGallery  $blogGallery
	 * @return \Illuminate\Http\Response
	 */
	public function show(BlogGallery $blogGallery)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\BlogGallery  $blogGallery
	 * @return \Illuminate\Http\Response
	 */
	public function edit(BlogGallery $blogGallery)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\BlogGallery  $blogGallery
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, BlogGallery $blogGallery)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\BlogGallery  $blogGallery
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(BlogGallery $blogGallery)
	{
		//
	}
}
