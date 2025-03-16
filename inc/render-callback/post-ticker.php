<?php
/**
 * 
 * Render Callback For Post Ticker
 * 
 */

function experimental_block_post_ticker_render( $attributes ) {

    $unique_ticker_id = 'experimental-block-post-ticker-' . 
    $attributes['blockId'] . 
    '-' . 
    substr(md5(uniqid('', true)), 0, 8);
	ob_start();
   
    $align_class = '';
  

    if (isset($attributes['align'])) {
        $align_class = 'align' . $attributes['align'];
    }

    if( $attributes['contentType'] == 'postIds' ){
        $post_ids = array_map('intval', explode(',', $attributes['postIds']));
    
        $args = array(
            'post_type' => 'post',
            'post__in'  => $post_ids,
        );
    }
    
    if( $attributes['contentType'] == 'catIds' ){
        $category_ids = array_map('intval', explode(',', $attributes['categoryIds']));
    
        $args = array(
            'post_type' => 'post',
            'numberposts' => $attributes['postCount'],
            'category' => $category_ids,
        );
    }
    
    if( $attributes['contentType'] == 'tagIds' ){ // New condition for tag IDs
        $tag_ids = array_map('intval', explode(',', $attributes['tagIds']));
    
        $args = array(
            'post_type' => 'post',
            'numberposts' => $attributes['postCount'],
            'tax_query' => array(
                array(
                    'taxonomy' => 'post_tag',
                    'field'    => 'term_id',
                    'terms'    => $tag_ids,
                ),
            ),
        );
    }
    
    if( $attributes['contentType'] == 'recentPost' ){
        $args = array(
            'post_type' => 'post',
            'numberposts' => $attributes['postCount'],
        );
    }
    
    $getPosts = get_posts($args);
    wp_reset_postdata();
    ?>
        <div 
        id="<?php echo esc_attr($unique_ticker_id); ?>"
        class="experimental-block-post-ticker <?php echo esc_attr($align_class); ?>"
        data-original-block-id="<?php echo esc_attr($attributes['blockId']); ?>"
            style="background: <?php echo esc_attr($attributes['postTickerBackground']); ?>"
        >
            <div class='experimental-block-post-ticker-breaking-news'
                style="background: <?php echo esc_attr($attributes['breakingNewBackground']);?>; color: <?php echo esc_attr($attributes['breakingNewColor']);?>"
            >
                <?php if(!empty($attributes['breakingNewLabel'])):?>
                    <span>
                        <?php echo esc_html($attributes['breakingNewLabel']);?>
                    </span>
                <?php endif; ?>
                <?php if(!empty($attributes['svgInput'])):?>
                    <span>
                        <?php echo $attributes['svgInput'];?>
                    </span>
                <?php endif; ?>
            </div>
            <div 
                class="post-ticker-marquee"
                data-block-id="<?php echo esc_attr($attributes['blockId']); ?>"
                data-duration='<?php echo esc_attr($attributes['slideSpeed']);?>' 
                data-gap='<?php echo esc_attr($attributes['gapBetween']);?>' 
                data-duplicated='true'
                data-pauseOnHover='<?php echo esc_attr($attributes['pauseOnHover']);?>'
                style="overflow: hidden; whiteSpace: nowrap"
            >   
                <?php foreach ($getPosts as $post) : ?>
                    <div style="display: inline-block; padding: 0 20px">
                        <div class='experimental-block-post-ticker-item'>
                            <?php if( get_the_post_thumbnail_url($post->ID) && $attributes['showThumbnail'] ): ?>
                                <a href="<?php echo esc_url(get_the_permalink($post->ID));?>">
                                    <img src="<?php echo esc_url(get_the_post_thumbnail_url($post->ID));?>" alt="<?php echo esc_attr(get_the_title($post->ID));?>" />
                                </a>
                            <?php endif; ?>
                            <p><a href="<?php echo esc_url(get_the_permalink($post->ID));?>" style="text-decoration: none; color: <?php echo esc_attr($attributes['postTextColor']);?>" ><?php echo esc_html(get_the_title($post->ID));?></a></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
	<?php
	$html = ob_get_clean();

	return $html;
}
