<?php

namespace App\Http\Controllers;

use App\Newsletter;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function csv() 
    {
    	$newsletters = Newsletter::all(['email']);
    	Excel::create('news', function($excel) use($newsletters)
    	{
    		$excel->setTitle('Newsletter');
    		$excel->setCreator('API Uno Consultoria')->setCompany('Uno Gestão de Saúde');
    		$excel->setDescription('E-mails para newsletter');
    		$excel->sheet('news', function($sheet) use($newsletters)
    		{
    			$sheet->fromArray($newsletters, null, 'A1', false, false);
    		});
    	})->export('csv');
    }
}
