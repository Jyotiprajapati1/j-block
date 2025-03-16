<?php
/**
 *
 * Render Callback For Trip FAQS
 */
function experimental_block_post_slider_render( $attributes ) {

	add_action(
		'wp_enqueue_scripts',
		function () use ( $attributes ) {
            wp_register_script( 'experimental-block-post-slider-dynamic-script', false, array(), false, true );
            wp_enqueue_script( 'experimental-block-post-slider-dynamic-script' );

			if($attributes['layout'] === 'grid'){
				$custom_js = "
                new Splide('#post-slider-" . esc_attr( $attributes['blockId'] ) . "', {
                    type       : 'loop',
					gap : '30px',
                    perPage    : " . esc_attr( $attributes['perPage'] ) . ",
                    pagination : " . ( $attributes['showDots'] ? 'true' : 'false' ) . ",
                    arrows     : " . ( $attributes['showArrow'] ? 'true' : 'false' ) . ",
                    interval: 3000,
                    autoplay    : ". ( $attributes['autoPlay'] ? 'true' : 'false' ) . ",
                    speed    : " . esc_attr( $attributes['speed']) . ",
                    pauseOnHover: " . ( $attributes['pauseHover'] ? 'true' : 'false' ) . ",
                    scroll     : {
                        perPage : true,
                        speed   : 500,
                    },
					breakpoints: {
                        1024: {
                            perPage: 3,
                        },
                        768: {
                            perPage: 2,
                        },
						480: {
                            perPage: 1,
                        },
                    },
                }).mount();
            ";
			}
			if ($attributes['layout'] === 'list') {
				$custom_js = "
					new Splide('#post-slider-" . esc_attr($attributes['blockId']) . "', {
						type       : 'loop',
                    perPage    : " . esc_attr( $attributes['perPage'] ) . ",
                    pagination : " . ( $attributes['showDots'] ? 'true' : 'false' ) . ",
                    arrows     : " . ( $attributes['showArrow'] ? 'true' : 'false' ) . ",
                    interval: 3000,
                    autoplay    : ". ( $attributes['autoPlay'] ? 'true' : 'false' ) . ",
                    speed    : " . esc_attr( $attributes['speed']) . ",
                    pauseOnHover: " . ( $attributes['pauseHover'] ? 'true' : 'false' ) . ",
						autoScroll : {
							speed: -1,
						},
						direction  : 'ttb',
						height     : " . esc_attr($attributes['containerHeight']) . " ,
						scroll     : {
							perPage : true,
							speed   : 500,
						},
					}).mount();
				";
			}
			
            
			wp_add_inline_script( 'experimental-block-post-slider-dynamic-script', $custom_js );
		}
	);

	$args        = array();
	$align_class = '';
	
	if ( isset( $attributes['align'] ) ) {
		$align_class = 'align' . $attributes['align'];
	}

	if ( $attributes['contentType'] == 'post-ids' ) {

		$post_ids = array_map( 'intval', explode( ',', $attributes['postIds'] ) );

		$args = array(
			'post_type' => 'post',
			'post__in'  => $post_ids,
		);
	}

	if ( $attributes['contentType'] == 'category-ids' ) {
		$category_ids = array_map( 'intval', explode( ',', $attributes['categoryIds'] ) );

		$args = array(
			'post_type'   => 'post',
			'numberposts' => $attributes['numPosts'],
			'category'    => $category_ids,
		);
	}

	if ( $attributes['contentType'] == 'recent' ) {

		$args = array(
			'post_type'   => 'post',
			'numberposts' => $attributes['numPosts'],
		);
	}

	$getPosts = get_posts( $args );
	wp_reset_postdata();

	ob_start();
	$design = !empty($attributes['design']) 
    ? preg_replace('/[^a-zA-Z0-9_-]/', '', $attributes['design']) 
    : 'one';

	include sprintf('%s/post-slider-list-grid-template/%s/%s-%s.php', dirname(__FILE__), $attributes['layout'], $attributes['layout'], $attributes['design']); 

	return ob_get_clean();
}
function post_slider_get_styles( $image_height, $title_font_size ) {
    $styles = array(
        '--image-height' => $image_height . 'px',
        '--title-font-size' => $title_font_size . 'px',
    );

    $inline_styles = '';
    foreach ( $styles as $key => $value ) {
        $inline_styles .= esc_attr( $key ) . ': ' . esc_attr( $value ) . '; ';
    }

    return $inline_styles;
}
 ?>
