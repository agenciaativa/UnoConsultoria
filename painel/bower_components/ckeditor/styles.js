/**
 * Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

// This file contains style definitions that can be used by CKEditor plugins.
//
// The most common use for it is the "stylescombo" plugin which shows the Styles drop-down
// list containing all styles in the editor toolbar. Other plugins, like
// the "div" plugin, use a subset of the styles for their features.
//
// If you do not have plugins that depend on this file in your editor build, you can simply
// ignore it. Otherwise it is strongly recommended to customize this file to match your
// website requirements and design properly.
//
// For more information refer to: http://docs.ckeditor.com/#!/guide/dev_styles-section-style-rules

CKEDITOR.stylesSet.add( 'default', [
	/* Block styles */

	// These styles are already available in the "Format" drop-down list ("format" plugin),
	// so they are not needed here by default. You may enable them to avoid
	// placing the "Format" combo in the toolbar, maintaining the same features.
	
	{ name: 'Normal',				element: 'p', 	attributes: { 'class': ' '	} },
	{ name: 'Parágrafo Negrito',	element: 'p',	attributes: { 'class': 'gb' } },
	{ name: 'Título 1',				element: 'h1' },
	{ name: 'Título 2',				element: 'h2',	attributes: { 'class': 'gb' } },
	{ name: 'Título 3',				element: 'h3' },
	/*{ 
		name: 'Conteúdo Destacado',		
		element: 'div', 
		attributes: { 'class' : 'featured-item col-md-8 col-md-offset-2' }, 
	},
	{
		name: 'Conteúdo Destaque',
		element: 'div',
		attributes: { 'class': 'featured-item col-md-8 col-md-offset-2 solid-bgcolor'},
	},*/
] );

CKEDITOR.stylesSet.add( 'custom', [
	/* Block styles */

	// These styles are already available in the "Format" drop-down list ("format" plugin),
	// so they are not needed here by default. You may enable them to avoid
	// placing the "Format" combo in the toolbar, maintaining the same features.
	
	{ name: 'Normal',				element: 'p', 	attributes: { 'class': ' '	} },
	{ name: 'Parágrafo Negrito',	element: 'p',	attributes: { 'class': 'gb' } },
	{ name: 'Título 1',				element: 'h1' },
	{ name: 'Título 2',				element: 'h2',	attributes: { 'class': 'gb' } },
	{ name: 'Título 3',				element: 'h3' },
	{ 
		name: 'Conteúdo Destacado',		
		element: 'div', 
		attributes: { 'class' : 'featured-item col-md-8 col-md-offset-2' }, 
	},
	{
		name: 'Conteúdo Destaque',
		element: 'div',
		attributes: { 'class': 'featured-item col-md-8 col-md-offset-2 solid-bgcolor'},
	},
] );
