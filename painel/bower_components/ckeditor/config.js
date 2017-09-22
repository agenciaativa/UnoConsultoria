/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		//{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		//{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'insert' },
		//{ name: 'forms' },
		{ name: 'tools' },
		//{ name: 'others' },
		//'/',
		//{ name: 'colors' },
		//{ name: 'about' }
		{ name: 'basicstyles', groups: [ 'basicstyles' ] },
		{ name: 'links' },
		{ name: 'paragraph',   groups: [ 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'document',	   groups: [ 'mode' ] },
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Strike,Anchor,Subscript,Superscript';

	config.format_span = { name: 'Texto curto', element: 'span' };
	
	config.format_div = { name: 'Caixa de Texto', element: 'div' };

	// Set the most common block elements.
	//config.format_tags = 'p;span;h1;h2;h3;div';
	config.format_tags = 'p;span;h1;h2;h3';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'link:advanced;image:Link;image:advanced;';

	config.skin = 'moonocolor';

	config.extraAllowedContent = 'div(*){*}[*]; span(*){*}[*]';
	config.filebrowserBrowseUrl = './bower_components/ckfinder/ckfinder.html',
	config.filebrowserImageBrowseUrl  = './bower_components/ckfinder/ckfinder.html',
	config.filebrowserWindowWidth = '1000',
	config.filebrowserWindowHeight = '700'

};

CKEDITOR.on( 'dialogDefinition', function( ev ) { 
	var dialogName = ev.data.name;
	var dialogDefinition = ev.data.definition;
	ev.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;

	if (dialogName == 'link') { 
		dialogDefinition.onShow = function () { 
			var dialog = CKEDITOR.dialog.getCurrent(); 
			elem = dialog.getContentElement('info','anchorOptions');     
			elem.getElement().hide(); 
			elem = dialog.getContentElement('info','emailOptions');     
			elem.getElement().hide(); 
			var elem = dialog.getContentElement('info','linkType');     
			elem.getElement().hide(); 
			elem = dialog.getContentElement('info','protocol');     
			elem.disable(); 
		}; 
	} 
	else if (dialogName == 'image') { 
		var infoTab = dialogDefinition.getContents('info'); 
		infoTab.remove('txtBorder');
		infoTab.remove('txtHSpace');
		infoTab.remove('txtVSpace');

		dialogDefinition.onLoad = function () { 
			var dialog = CKEDITOR.dialog.getCurrent(); 
			var elem = dialog.getContentElement('info','htmlPreview');     
			elem.getElement().hide(); 
		}; 
	} 
	else if (dialogName == 'table') { 
		dialogDefinition.removeContents('advanced'); 
	}         
}); 