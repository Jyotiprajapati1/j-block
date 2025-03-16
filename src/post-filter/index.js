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
	  id: "Icons",
	  viewBox: "0 0 32 32",
	  xmlSpace: "preserve"
	},
	wp.element.createElement('g', null,
	  wp.element.createElement('rect', { x: "19", y: "4", width: "5", height: "5" }),
	  wp.element.createElement('path', { d: "M26,9h5V7c0-1.7-1.3-3-3-3h-2V9z" }),
	  wp.element.createElement('rect', { x: "12", y: "4", width: "5", height: "5" })
	),
	wp.element.createElement('path', { d: "M11,11c-0.6,0-1-0.4-1-1V4H4C2.3,4,1,5.3,1,7v18c0,1.7,1.3,3,3,3h24c1.7,0,3-1.3,3-3V11H11z M7,9H4C3.4,9,3,8.6,3,8 s0.4-1,1-1h3c0.6,0,1,0.4,1,1S7.6,9,7,9z" })
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
