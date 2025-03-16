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
	  width: "800px",
	  height: "800px",
	  viewBox: "0 0 24 24",
	  fill: "none",
	  xmlns: "http://www.w3.org/2000/svg"
	},
	wp.element.createElement('path', {
	  d: `M6.41861 8C6.41861 5.17157 6.41861 3.75736 7.23598 2.87868C8.05336 2 9.36891 2 12 2C14.6311 2 15.9466 2 16.764 2.87868C17.5814 3.75736 17.5814 5.17157 17.5814 8V16C17.5814 18.8284 17.5814 20.2426 16.764 21.1213C15.9466 22 14.6311 22 12 22C9.36891 22 8.05336 22 7.23598 21.1213C6.41861 20.2426 6.41861 18.8284 6.41861 16L6.41861 8Z`,
	  fill: "black"
	}),
	wp.element.createElement('path', {
	  d: `M5.02325 7.90125L5.02326 8L5.02325 16.0987C5.0232 17.0815 5.02316 17.9638 5.06946 18.7277C5.08581 18.9974 5.10793 19.2523 5.13787 19.4917C5.15132 19.5992 5.16661 19.7062 5.18411 19.8126C5.21968 20.0288 5.05257 20.2326 4.83435 20.2134C4.40341 20.1756 4.01421 20.0949 3.65073 19.8958C3.08186 19.5842 2.61937 19.087 2.32952 18.4755C2.14431 18.0847 2.06921 17.6663 2.034 17.2031C1.99999 16.7555 1.99999 16.2048 2 15.5314L2 8.46859C1.99999 7.79521 1.99999 7.2445 2.034 6.79693C2.06921 6.33367 2.14431 5.91527 2.32952 5.52453C2.61937 4.913 3.08186 4.41582 3.65073 4.10423C4.01421 3.90514 4.40341 3.8244 4.83435 3.78655C5.05257 3.76739 5.21968 3.97125 5.18411 4.1874C5.16661 4.29376 5.15132 4.40079 5.13787 4.50831C5.10793 4.74771 5.08581 5.00264 5.06946 5.27233C5.02316 6.03622 5.0232 6.91848 5.02325 7.90125Z`,
	  fill: "black"
	}),
	wp.element.createElement('path', {
	  d: `M18.9767 16.0987L18.9767 7.90126C18.9768 6.91849 18.9768 6.03623 18.9305 5.27233C18.9142 5.00264 18.8921 4.74771 18.8621 4.50831C18.8487 4.40079 18.8334 4.29376 18.8159 4.1874C18.7803 3.97125 18.9474 3.76739 19.1656 3.78655C19.5966 3.8244 19.9858 3.90514 20.3493 4.10423C20.9181 4.41582 21.3806 4.913 21.6705 5.52453C21.8557 5.91527 21.9308 6.33367 21.966 6.79693C22 7.2445 22 7.79521 22 8.46859L22 15.5314C22 16.2048 22 16.7555 21.966 17.2031C21.9308 17.6663 21.8557 18.0847 21.6705 18.4755C21.3806 19.087 20.9181 19.5842 20.3493 19.8958C19.9858 20.0949 19.5966 20.1756 19.1656 20.2134C18.9474 20.2326 18.7803 20.0288 18.8159 19.8126C18.8334 19.7062 18.8487 19.5992 18.8621 19.4917C18.8921 19.2523 18.9142 18.9974 18.9305 18.7277C18.9768 17.9638 18.9768 17.0815 18.9767 16.0987Z`,
	  fill: "black"
	})
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
