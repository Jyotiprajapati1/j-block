<?php
/**
 * 
 * Render Callback For Trip Code
 * 
 */

function experimental_block_video_popup_render( $attributes ) {
	
    wp_add_inline_script("experimental-block-custom-js", "
        jQuery(document).ready(function($) {
             $('#experimental-block-video-popup-" . esc_attr($attributes['blockId']) . "').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                preloader: true,
            });
        });
    ");

	ob_start();
    ?>
	<style>		
		#experimental-block-video-popup{
			<?php if( !empty( $attributes['iconColor'] ) ): ?>
				color: <?php echo esc_attr( $attributes['iconColor'] ); ?> !important;
			<?php endif; ?>
			<?php if( !empty( $attributes['fontSize'] ) ): ?>
				font-size: <?php echo esc_attr( $attributes['fontSize'] ); ?>px;
			<?php endif; ?>
		}		
		
	</style>
	<div id="experimental-video-block-popup">
		<a id="experimental-block-video-popup-<?php echo esc_attr( $attributes['blockId'] );?>" href="https://www.youtube.com/watch?v=<?php echo esc_attr( $attributes['videoCode'] ); ?>"
            style ="color: <?php echo esc_attr( $attributes['iconColor'] ); ?>; font-size: <?php echo esc_attr( $attributes['fontSize'] ); ?>px; "
        >
			<i class="fa fa-play-circle"></i>
		</a>
	</div>
	
	<?php
	return ob_get_clean();
}
