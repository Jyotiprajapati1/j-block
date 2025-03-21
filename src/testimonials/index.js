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
    // fill: "#000000",
    version: "1.1",
    width: "800px",
    height: "800px",
    viewBox: "0 0 478.248 478.248",
    xmlSpace: "preserve"
  },
  wp.element.createElement(
    'g',
    null,
    wp.element.createElement(
      'g',
      null,
      wp.element.createElement(
        'g',
        null,
        wp.element.createElement('path', {
          d: `M456.02,44.821H264.83c-12.26,0-22.232,9.972-22.232,22.229v98.652c0,12.258,9.974,22.23,22.232,22.23h16.787v39.161
          c0,2.707,1.58,5.165,4.043,6.292c0.92,0.42,1.901,0.627,2.875,0.627c1.631,0,3.244-0.576,4.523-1.685l51.383-44.396h111.576
          c12.26,0,22.23-9.973,22.23-22.23V67.05C478.25,54.792,468.277,44.821,456.02,44.821z`,
        }),
        wp.element.createElement('path', {
          d: `M319.922,112.252l-10.209,9.953l2.41,14.054c0.174,1.015-0.242,2.038-1.076,2.643c-0.469,0.342-1.027,0.516-1.588,0.516
          c-0.428,0-0.861-0.103-1.256-0.31l-12.621-6.635l-12.619,6.635c-0.912,0.478-2.016,0.398-2.848-0.206s-1.248-1.628-1.074-2.643
          l2.41-14.054l-10.211-9.953c-0.734-0.718-1.002-1.792-0.685-2.769c0.317-0.978,1.164-1.691,2.183-1.839l14.11-2.05l6.31-12.786
          c0.457-0.923,1.396-1.507,2.424-1.507s1.969,0.584,2.422,1.507l6.312,12.786l14.107,2.05c1.02,0.148,1.863,0.861,2.184,1.839
          C320.924,110.46,320.658,111.535,319.922,112.252z`,
        }),
        wp.element.createElement('path', {
          d: `M384.766,112.252l-10.211,9.953l2.412,14.054
          c0.172,1.015-0.244,2.038-1.076,2.643c-0.469,0.342-1.025,0.516-1.588,0.516c-0.43,0-0.859-0.103-1.26-0.31l-12.619-6.635
          l-12.619,6.635c-0.912,0.478-2.014,0.398-2.846-0.206c-0.834-0.604-1.25-1.628-1.076-2.643l2.41-14.054l-10.209-9.953
          c-0.734-0.718-1.002-1.792-0.684-2.769c0.316-0.978,1.16-1.691,2.182-1.839l14.109-2.05l6.311-12.786
          c0.455-0.923,1.396-1.507,2.422-1.507c1.029,0,1.967,0.584,2.422,1.507l6.312,12.786l14.109,2.05
          c1.021,0.148,1.863,0.861,2.182,1.839C385.768,110.46,385.5,111.535,384.766,112.252z`,
        }),
        wp.element.createElement('path', {
          d: `M449.607,112.252l-10.211,9.953l2.408,14.054c0.176,1.015-0.238,2.038-1.072,2.643
          c-0.471,0.342-1.027,0.516-1.59,0.516c-0.43,0-0.859-0.103-1.258-0.31l-12.621-6.635l-12.621,6.635
          c-0.908,0.478-2.012,0.398-2.844-0.206c-0.834-0.604-1.248-1.628-1.076-2.643l2.412-14.054l-10.211-9.953
          c-0.734-0.718-1-1.792-0.684-2.769c0.316-0.978,1.164-1.691,2.182-1.839l14.111-2.05l6.311-12.786
          c0.453-0.923,1.395-1.507,2.42-1.507c1.027,0,1.971,0.584,2.426,1.507L434,105.594l14.109,2.05
          c1.018,0.148,1.861,0.861,2.182,1.839C450.609,110.46,450.344,111.535,449.607,112.252z`,
        }),
        wp.element.createElement('path', {
          d: `M152.844,112.924c-46.76,0-72.639,24.231-72.166,70.921c0.686,63.947,27.859,102.74,72.166,102.063
          c0,0,72.131,2.924,72.131-102.063C224.975,137.155,200.605,112.924,152.844,112.924z`,
        }),
        wp.element.createElement('path', {
          d: `M280.428,334.444l-72.074-28.736l-16.877-14.223c-4.457-3.766-11.041-3.488-15.178,0.621l-23.463,23.336
          l-23.533-23.342c-4.137-4.104-10.713-4.369-15.164-0.615l-16.881,14.223l-72.074,28.739C1.975,343.69,1.995,425.884,0,433.427
          h305.646C303.656,425.9,303.646,343.679,280.428,334.444z`,
        })
      )
    )
  )
);


registerBlockType(  metadata.name, {
  icon,
  //variations,
  edit: Edit,

  save,
});
