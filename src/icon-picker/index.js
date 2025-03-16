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


registerBlockType( metadata.name, {

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
	supports: {
		color: {
			background: true,
			text: true,
			link: true,
		},
		typography: {
			// Enable support and UI control for font-size.
			fontSize: true,
			// Enable support and UI control for line-height.
			lineHeight: true,
		},
		spacing: {
			margin: true,  // Enable margin UI control.
			padding: true, // Enable padding UI control.
			blockGap: true,  // Enables block spacing UI control.
		},
	},
} );
