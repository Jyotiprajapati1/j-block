/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from "@wordpress/i18n";

import Edit from './edit';
import save from './save';
import metadata from './block.json';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

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
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    viewBox: "0 0 24 24",
    xmlSpace: "preserve"
  },
  wp.element.createElement('path', { d: 'M20.1376 9.05555C21.2935 9.05555 22.2306 8.11848 22.2306 6.96253C22.2306 5.80659 21.2935 4.86951 20.1376 4.86951C18.9816 4.86951 18.0446 5.80659 18.0446 6.96253C18.0446 8.11848 18.9816 9.05555 20.1376 9.05555Z', fill: '#000000' }),
  wp.element.createElement('path', { d: 'M19.0215 18.7972C19.1561 18.8142 19.2932 18.8229 19.4325 18.8229H19.4478C21.2416 18.8229 22.6957 17.3688 22.6957 15.575V10.8694C22.6957 10.3814 22.3001 9.98572 21.812 9.98572H19.2939C19.4364 10.2554 19.5149 10.5636 19.5096 10.8896V16.236C19.5291 17.144 19.3536 18.0111 19.0215 18.7972Z', fill: '#000000' }),
  wp.element.createElement('path', { d: 'M17.2096 17.9435C16.5785 17.3511 16.1842 16.5094 16.1841 15.5755V10.9857H17.5096V16.2588L17.5099 16.2704C17.5237 16.8614 17.416 17.4271 17.2096 17.9435Z', fill: '#000000' }),
  wp.element.createElement('path', { d: 'M13.9281 9.03159C15.4559 8.87992 16.6491 7.59093 16.6491 6.02326C16.6491 4.35356 15.2955 3 13.6258 3C11.9561 3 10.6025 4.35356 10.6025 6.02326C10.6025 6.08092 10.6042 6.1382 10.6073 6.19507H12.0755C13.0987 6.19507 13.9281 7.0245 13.9281 8.04762V9.03159Z', fill: '#000000' }),
  wp.element.createElement('path', { d: 'M11.9281 8.5252V8.19507H11.5226C11.6478 8.31634 11.7835 8.42688 11.9281 8.5252Z', fill: '#000000' }),
  wp.element.createElement('path', { d: 'M8.27593 16.4276C8.2753 16.3677 8.27568 16.3075 8.27708 16.2471V15.1759H8.75V10.6759H10.5V9.98572H11.9281V16.4276H8.27593Z', fill: '#000000' }),
  wp.element.createElement('path', { d: 'M8.695 18.4276H12.0755C13.0987 18.4276 13.9281 17.5982 13.9281 16.5751V9.98572H17.6571C18.1393 9.99765 18.5208 10.3979 18.5096 10.8801V16.2471C18.577 19.1412 16.2873 21.5428 13.3934 21.6136C11.2731 21.5617 9.47723 20.2588 8.695 18.4276Z', fill: '#000000' }),
  wp.element.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M12.0757 7.19507H3.54823C3.07739 7.19507 2.69568 7.57677 2.69568 8.04762V16.5751C2.69568 17.0459 3.07738 17.4276 3.54823 17.4276H12.0757C12.5465 17.4276 12.9282 17.0459 12.9282 16.5751V8.04762C12.9282 7.57677 12.5465 7.19507 12.0757 7.19507ZM5.5 10.6759H7.25V15.1759H8.25V10.6759H10V9.6759H5.5V10.6759Z', fill: '#000000' })
);


registerBlockType(  metadata.name, {
  icon,
  //variations,
  edit: Edit,

  save,
});
