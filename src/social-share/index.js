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

const icon = wp.element.createElement(
	'svg',
	{
	  width: "800px",
	  height: "800px",
	  viewBox: "0 0 24 24",
	  fill: "none",
	  xmlns: "http://www.w3.org/2000/svg"
	},
	wp.element.createElement('circle', {
	  cx: "6",
	  cy: "12",
	  r: "2",
	  stroke: "black",
	  strokeWidth: "2",
	  fill: "none"
	}),
	wp.element.createElement('circle', {
	  cx: "18",
	  cy: "6",
	  r: "2",
	  stroke: "black",
	  strokeWidth: "2",
	  fill: "none"
	}),
	wp.element.createElement('circle', {
	  cx: "18",
	  cy: "18",
	  r: "2",
	  stroke: "black",
	  strokeWidth: "2",
	  fill: "none"
	}),
	wp.element.createElement('path', {
	  d: `M8 12L16 7.5`,
	  stroke: "black",
	  strokeWidth: "2",
	  strokeLinecap: "round"
	}),
	wp.element.createElement('path', {
	  d: `M8 12L16 16.5`,
	  stroke: "black",
	  strokeWidth: "2",
	  strokeLinecap: "round"
	})
  );
  

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
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
