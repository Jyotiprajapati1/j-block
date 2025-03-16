<?php 

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

if( $attributes['contentType'] == 'tagIds' ){ 
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
        'post__not_in' => array($post_id),
        'post_type' => 'post',
        'numberposts' => $attributes['postCount'],
    );
}

if ($attributes['contentType'] === 'relatedPost') {
    if ($attributes['postByTags'] == true || $attributes['postByCategory'] == true) {
        $post_id = get_the_ID();
        $tax_query = array();

        if (!empty($attributes['postByCategory']) && $attributes['postByCategory']) {
            $categories = get_the_category($post_id);
            if (!empty($categories)) {
                $category_ids = wp_list_pluck($categories, 'term_id');
                $tax_query[] = array(
                    'taxonomy' => 'category',
                    'field' => 'term_id',
                    'terms' => $category_ids,
                );
            }
        }

        if (!empty($attributes['postByTags']) && $attributes['postByTags']) {
            $tags = wp_get_post_tags($post_id);
            if (!empty($tags)) {
                $tag_ids = wp_list_pluck($tags, 'term_id');
                $tax_query[] = array(
                    'taxonomy' => 'post_tag',
                    'field' => 'term_id',
                    'terms' => $tag_ids,
                );
            }
        }

        if (!empty($tax_query)) {
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => $attributes['postCount'],
                'post__not_in' => array($post_id),
                'tax_query' => $tax_query,
            );
        }
    } else {
        return null;
    }
}

$getPosts = get_posts($args);
wp_reset_postdata();

?>
<div class="grid-one experimental-block-post-grid-tab-content-wrapper">
<div class="col-<?php  echo $attributes['gridColumn'] ?>">
    <div class="experimental-block-post-grid-tab-content active">
        <?php foreach ($getPosts as $post) : ?>
            <article>
                <div class="grid-item-wrapper clear">
                    <?php if( get_the_post_thumbnail_url($post->ID) && $attributes['showThumbnail'] ): ?>
                        <div class="featured-image" style="background-image: url('<?php echo esc_url(get_the_post_thumbnail_url($post->ID));?>');">
                        </div>
                    <?php endif; ?>
                    <div class="entry-container clear">
                        <header class="entry-header">
                            <h2 class="entry-title">
                                <a href="<?php echo esc_url(get_the_permalink($post->ID));?>" tabindex="0"><?php echo esc_html(get_the_title($post->ID));?></a></h2>
                        </header>
                        <div class="entry-meta">
                            <?php if( $attributes['showAuthor'] ): ?>
                                <span class="post-author"><i class="fas fa-user"></i><?php echo esc_html(get_the_author_meta( $post->post_author)); ?></a></h2></span>
                            <?php endif; ?>
                            
                            <?php if( $attributes['showDate'] ): ?>
                                <span class="post-date"><i class="fas fa-calendar"></i> <?php echo esc_html( get_the_date( '', $post->ID ) ); ?></span>
                            <?php endif; ?>
                            
                        </div>
                        <div class="entry-content">
                            <p> 
                            <?php if( $attributes['showExcert'] ): ?>
                                <?php echo esc_html(get_the_excerpt($post->ID)); ?>                                                        
                                <a href="<?php echo esc_url(get_the_permalink($post->ID));?>" class="more-link"><?php echo esc_html__( 'Read More', 'experimental-block' ); ?></a>
                                <?php endif; ?>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            
        <?php endforeach; ?>
    </div>
                            </div>
                                            
</div>
