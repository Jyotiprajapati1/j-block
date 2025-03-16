/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;
	const { textAlign, icon, linkURL  } = attributes;
	return (
		<>
			{
				linkURL == "" || linkURL == null
					?
					<div { ...useBlockProps.save() } >
						<div style={ {textAlign: textAlign} }>
							<i className={icon} ></i>
						</div>
						
					</div>
					: 
					<div { ...useBlockProps.save() } >
						<div style={ {textAlign: textAlign} }>
							<a href={linkURL}>
								<i className={icon} ></i>
							</a>
						</div>
						
					</div>
			}
		</>
	);
}
