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
	const { numStar, textAlign } = attributes;

	const StarIcon = () => {
		var starIcon 
		if( numStar == 1 ){
			starIcon = <><span>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span></>
		}
		
		if( numStar == 2 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span></>
		
		}

		if( numStar == 3 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span></>
		
		}

		if( numStar == 4 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span className='not-checked'>&#9733;</span></>
		
		}

		if( numStar == 5 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></>
		
		}

		return starIcon;
	};

	return (

		<div { ...useBlockProps.save() } >
			<div className="experimental-block-star-icon" style={ { textAlign: textAlign } }>
				<StarIcon />
			</div>
		</div>
					
	);
}
