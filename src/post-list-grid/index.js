/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

const icon = wp.element.createElement(
	'svg',
	{
	  fill: "#000000",
	  version: "1.1",
	  id: "Capa_1",
	  width: "800px",
	  height: "800px",
	  viewBox: "0 0 35 35",
	  xmlSpace: "preserve"
	},
	wp.element.createElement(
	  'g',
	  null,
	  wp.element.createElement(
		'g',
		null,
		wp.element.createElement('rect', { width: "16", height: "16" }),
		wp.element.createElement('rect', { x: "19", width: "16", height: "16" }),
		wp.element.createElement('rect', { y: "19", width: "16", height: "16" }),
		wp.element.createElement('rect', { x: "19", y: "19", width: "16", height: "16" })
	  )
	)
  );
  


registerBlockType( metadata.name, {
	icon,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
} );
