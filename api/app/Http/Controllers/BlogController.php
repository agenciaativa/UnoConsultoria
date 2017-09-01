<?php

namespace App\Http\Controllers;

use App\Blog;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Http\Requests\BlogRequest;
use Illuminate\Http\Request;

class BlogController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$blog = Blog::orderBy('id', 'desc')->get();

		return response()->json(['blog' => $blog, 'message' => '']);
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
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(BlogRequest $request)
	{

		$message = 'Não foi possível inserir o conteúdo do blog!';
		$filepath = upload_file($request->image_client_path, 'uploads/blog');

		$dataentrada = explode('/', $request->date_publish);

		if(empty($request->date_publish)):
			$data = date('Y-m-d H:i:s');
		else:
			$data = $dataentrada[2].'-'.$dataentrada[1].'-'.$dataentrada[0].' 00:00:00';
		endif;

		$input = [
			'title_client' => $request->title_client,
			'title_tags' => $request->title_tags,
			'tags_slug' => str_slug($request->title_tags, ','),
			'resume' => str_limit(strip_tags($request->description), 200, '...'),
			'description' => $request->description,
			'image_client_path' => $filepath,
			'status' => $request->status,
			'date_publish' => $data,
			'views' => 1,
			'slug' => str_slug($request->title_client, '-'),
			'user' => 'Fernando Vicente',
		];
		if (Blog::create($input))
			$message = 'Blog inserido com sucesso!';

		$blog = Blog::all();

		return response()->json(['blog' => $blog, 'message' => $message]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Blog  $blog
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$blog = Blog::find($id);

		return response()->json(['blogdetalhes' => $blog, 'message' => '']);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Blog  $blog
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Blog $blog)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param $id
	 * @return \Illuminate\Http\Response
	 * @internal param Blog $blog
	 */
	public function update(Request $request, $id)
	{
		$input = $request->all();

		if(empty($request->date_publish)):
			$data = date('Y-m-d H:i:s');
		else:
			$dataentrada = explode('/', $request->date_publish);
			$data = $dataentrada[2].'-'.$dataentrada[1].'-'.$dataentrada[0].' 00:00:00';
		endif;

		$rules = array(
			'title_client'  => 'required',
			'title_tags' => 'required'
		);

		$messages = [
			'required' => 'Campo obrigatório',
		];

		$validator = Validator::make($input, $rules, $messages);

		$this->validate($request, [
			'title_client' => 'required',
			'title_tags' => 'required'
		], $messages);

		$message = 'Não foi possível alterar o conteúdo do blog!';
		$classe = 'alert-danger';

		if ($validator->fails())
		{
			$blog = Blog::all();

			return response()->json(['blog' => $blog, 'message' => $validator->errors()->first(), 'classe' => $classe]);
		}
		else
		{
			$blog = Blog::find($id);
			$blog->title_client = $input['title_client'];
			$blog->title_tags = $input['title_tags'];
			$blog->tags_slug = str_slug($input['title_tags'], ',');
			$blog->resume = str_limit(strip_tags($input['description']), 200, '...');
			$blog->description = $input['description'];
			$blog->status = $input['status'];
			$blog->image_client_path = $input['image_client_path'];
			$blog->date_publish = $data;
			$blog->views = $blog->views + 1;

			if($file = $request->file('file')):
				$stored_file = public_path('storage/').$blog->image_client_path;
				$file = $request->file('file');
				$blog->image_client_path = upload_file($file, 'uploads/blog', $stored_file);
			endif;


			if ($blog->save())
			{
				$message = 'Blog alterado com sucesso!';
				$classe = 'alert-success';
			}

			$blog = Blog::all();

			return response()->json(['blog' => $blog, 'message' => $message, 'classe' => $classe]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Blog  $blog
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		$message = 'Não foi possível excluir o conteúdo do blog!';
		$blog = Blog::find($id);
		$stored_file = public_path('storage/').$blog->image_client_path;
		if ($blog->delete())
		{
			@unlink($stored_file);
			$message = 'Blog excluído com sucesso!';
		}

		$blog = Blog::all();

		return response()->json(['blog' => $blog, 'message' => $message]);
	}
}
