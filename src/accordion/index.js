/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

const icon = wp.element.createElement(
  "svg",
  {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    className: "sikho-block-icon",
  },
  wp.element.createElement("path", {
    d: "M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2zm0 2v10h16V7H4zm8 3h4v2h-4v-2zm-6 0h4v2H6v-2zm12 0h4v2h-4v-2z",
  })
);

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

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
registerBlockType(metadata.name, {
  title: "Accordion",
  icon,
  //variations,
  edit: Edit,

  save,
});
