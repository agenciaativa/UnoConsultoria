<?php

if (! function_exists('upload_file'))
{
	/**
	* Upload file to Storage. 
	* Delete stored file if exists.
	*
	* @param  \Illuminate\Http\Request  $file
	* @param  string  $stored
	* @return string
	*/
	function upload_file($file = null, $upload_path = '', $stored = null, $filename = '')
	{
		$filepath = null; 

		if (!empty($file) && $upload_path) 
		{
			if ($stored) 
				@unlink($stored);

			if ($filename)
				$filepath = $file->storeAs($upload_path, $filename);
			else
				$filepath = $file->store($upload_path);
		}

		return $filepath;
	}
}