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
		//{ name: 'insert' },
		//{ name: 'forms' },
		//{ name: 'tools' },
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
	config.removeDialogTabs = 'image:advanced;link:advanced';

	config.skin = 'moonocolor';

	config.extraAllowedContent = 'div(*){*}[*]; span(*){*}[*]';

};
