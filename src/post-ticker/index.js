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
	  height: "800px",
	  width: "800px",
	  version: "1.1",
	  id: "Layer_1",
	  viewBox: "0 0 512 512",
	  xmlSpace: "preserve"
	},
	wp.element.createElement(
	  'g',
	  null,
	  wp.element.createElement(
		'g',
		null,
		wp.element.createElement('path', {
		  style: { fill: "#231F20" },
		  d: `M424.536,163.485V20.91c0-11.548-9.362-20.91-20.91-20.91H38.252
			c-11.548,0-20.91,9.362-20.91,20.91V491.09c0,11.548,9.362,20.91,20.91,20.91h365.376c11.548,0,20.91-9.362,20.91-20.91V310.596
			l53.555-53.555l0.001-0.001C518.334,216.794,479.33,149.347,424.536,163.485z M102.38,78.367H339.5
			c11.548,0,20.911,9.362,20.911,20.911s-9.362,20.91-20.911,20.91H102.38c-11.548,0-20.91-9.362-20.91-20.91
			S90.832,78.367,102.38,78.367z M102.38,150.054h181.403c11.548,0,20.91,9.362,20.91,20.91s-9.362,20.911-20.91,20.911H102.38
			c-11.548,0-20.91-9.362-20.91-20.911S90.832,150.054,102.38,150.054z M102.38,221.74h181.403c11.548,0,20.91,9.362,20.91,20.91
			s-9.362,20.91-20.91,20.91H102.38c-11.548,0-20.91-9.362-20.91-20.91S90.832,221.74,102.38,221.74z M102.38,335.248
			c-11.548,0-20.91-9.362-20.91-20.91s9.362-20.91,20.91-20.91h88.002c11.548,0,20.91,9.362,20.91,20.91s-9.362,20.91-20.91,20.91
			H102.38z M260.873,449.051l-36.379,7.103c-14.57,2.842-27.368-10.002-24.529-24.529l7.103-36.377
			c1.069-5.479,7.823-7.54,11.77-3.592l45.629,45.629C268.413,441.228,266.351,447.982,260.873,449.051z M448.521,227.468
			c-34.937,34.937-130.979,130.978-162.281,162.279l-19.875-19.875c7.224-7.224,148.19-148.191,162.272-162.272
			C441.763,194.491,461.689,214.3,448.521,227.468z`
		})
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
