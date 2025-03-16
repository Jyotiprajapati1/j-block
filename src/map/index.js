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
	wp.element.createElement('path', {
	  d: `M12 2C9.79 2 8 3.79 8 6C8 8.56 12 13 12 13C12 13 16 8.56 16 6C16 3.79 14.21 2 12 2ZM12 8C11.45 8 11 7.55 11 7C11 6.45 11.45 6 12 6C12.55 6 13 6.45 13 7C13 7.55 12.55 8 12 8Z`,
	  fill: "black"
	}),
	wp.element.createElement('path', {
	  d: `M3 10L9 8L15 10L21 8V20L15 18L9 20L3 18V10Z`,
	  stroke: "black",
	  strokeWidth: "2",
	  strokeLinejoin: "round"
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
