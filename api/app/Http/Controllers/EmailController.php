<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Mail;

class EmailController extends Controller
{
	private $headers = [
		'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers' => 'Origin, Content-Type, Accept, Authorization, X-Requested-With'
	];

	private $departamentos = [
		'A'		=> 	'arquitetura',
		'C' 	=> 	'contabilidade',
		'F' 	=> 	'financeiro',
		'G' 	=> 	'pessoas',
		'Q' 	=> 	'qualidade',
		'J' 	=> 	'juridico',
		'M' 	=> 	'marketing',
		'T' 	=>	'tecnica'
	];

	private $mail_domain = '@unogestaodesaude.com.br';

	public function send(Request $request) {
		$status = 200;

		try {

			$mail = [
				'nome'			=>	$request->json()->get('nome'),
				'email'			=>	$request->json()->get('email'),
				'telefone'		=>	$request->json()->get('telefone'),
				'mensagem'		=>	$request->json()->get('mensagem'),
				'departamento' 	=>	$request->json()->get('departamento')
			];

			$recipients = [
				'bruno.spoladore@agenciaativa.com.br', 
				'liveroluisotavio@gmail.com', 
				$this->departamentos[$mail['departamento']].$this->mail_domain
			];

			Mail::send('emails.sendmail', $mail, function($mensagem) use ($recipients) {
				$mensagem->to($recipients);
				$mensagem->from('unogestao@gmail.com', 'Contato Site Uno Consultoria');
				$mensagem->subject('Contato Site Uno Consultoria');
			});

			$message = ['classe' => 'success', 'texto' => 'Contato enviado com sucesso!'];

		} catch (Exception $e) {
			$message = ['classe' => 'danger', 'texto' => 'Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.'];
			$status = 400;
		}

		return response()->json($message, $status, $this->headers);
	}
}
