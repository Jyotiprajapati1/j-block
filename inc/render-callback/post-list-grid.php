<?php
/**
 * 
 * Render Callback For Post List Grid
 * 
 */

function experimental_block_post_list_grid_render($attributes)
{
    $show_thumbnail = $attributes['showThumbnail'] ? 1 : 0;
    $show_author = $attributes['showAuthor'] ? 1 : 0;
    $show_date = $attributes['showDate'] ? 1 : 0;

    block_scripts();

    wp_add_inline_script("experimental-block-custom-js", "
        jQuery(document).ready(function($) {
            var offset = " . $attributes['postCount'] . ";

            $('#post-list-grid-" . $attributes['blockId'] . " .load-more').on('click', function() {
                var button = $(this);

                $.ajax({
                    type: 'POST',
                    url: ajaxfilter.ajaxurl,
                    data: {
                        action: 'load_more_posts',
                        offset: offset,
                        layout: '" . $attributes['layout'] . "',
                        design: '" . $attributes['design'] . "',
                        showThumbnail: " . $show_thumbnail . ",
                        showAuthor: " . $show_author . ",
                        showDate: " . $show_date . ",
                        pageperpost: " . $attributes['postCount'] . "
                    },
                    success: function(response) {
                        if (response.trim() === 'no_more') {
                            $('#post-list-grid-" . $attributes['blockId'] . " .no-more-posts').show();
                            button.hide(); 
                        } else {
                            $('#post-list-grid-" . $attributes['blockId'] . " .experimental-block-post-" . $attributes['layout'] . "-tab-content').append(response);
                            offset += " . $attributes['postCount'] . "+1; 
                        }
                    },
                    error: function() {
                        $('#post-list-grid-" . $attributes['blockId'] . " .no-more-posts').show().text('An error occurred. Please try again.');
                    }
                });
            });
        });
    ");

    ob_start();
    $align_class = '';
    if (isset($attributes['align'])) {
        $align_class = 'align' . $attributes['align'];
    }

    if ($attributes['contentType'] == 'postIds') {
        $post_ids = array_map('intval', explode(',', $attributes['postIds']));

        $args = array(
            'post_type' => 'post',
            'post__in' => $post_ids,
        );
    }

    if ($attributes['contentType'] == 'catIds') {
        $category_ids = array_map('intval', explode(',', $attributes['categoryIds']));

        $args = array(
            'post_type' => 'post',
            'numberposts' => $attributes['postCount'],
            'category' => $category_ids,
        );
    }

    if ($attributes['contentType'] == 'tagIds') { // New condition for tag IDs
        $tag_ids = array_map('intval', explode(',', $attributes['tagIds']));

        $args = array(
            'post_type' => 'post',
            'numberposts' => $attributes['postCount'],
            'tax_query' => array(
                array(
                    'taxonomy' => 'post_tag',
                    'field' => 'term_id',
                    'terms' => $tag_ids,
                ),
            ),
        );
    }

    if ($attributes['contentType'] == 'recentPost') {
        $post_id = get_the_ID();
        $args = array(
            'post_type' => 'post',
            'numberposts' => $attributes['postCount'],
            'post__not_in' => array($post_id),
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

    echo "<div id='post-list-grid-" . esc_attr($attributes['blockId']) . "' class='" . esc_attr($align_class) . "'>";
    include sprintf('%s/list-grid-template/%s/%s-%s.php', dirname(__FILE__), $attributes['layout'], $attributes['layout'], $attributes['design']);

    if ($attributes['showLoadMore']):
        ?>
        <div class="load-more-wrapper" style="text-align:center;">
            <button class="load-more"
                data-offset="6"><?php echo esc_html__('Load More Posts', 'experimental-block'); ?></button>
        </div>
        <div class="no-more-posts" style="display:none;">
            <?php echo esc_html__('No more posts to load.', 'experimental-block'); ?>
        </div>
        <?php
    endif;
    echo "</div>";

    $html = ob_get_clean();

    return $html;
}

function experimental_block_load_more_posts_ajax()
{
    $offset = isset($_POST['offset']) ? intval($_POST['offset']) : 0;
    $args = array(
        'posts_per_page' => $_POST['pageperpost'] + 1,
        'offset' => $offset,
    );

    $query = new WP_Query($args);

    if ($query->have_posts()):
        while ($query->have_posts()):
            $query->the_post();
            ?>
            <?php if ($_POST['layout'] == 'grid' && $_POST['design'] == 'one'): ?>
                <article>
                    <div class="grid-item-wrapper clear">
                        <?php if (get_the_post_thumbnail_url(get_the_id()) && $_POST['showThumbnail']): ?>
                            <div class="featured-image"
                                style="background-image: url('<?php echo esc_url(get_the_post_thumbnail_url(get_the_id())); ?>');">
                            </div>
                        <?php endif; ?>
                        <div class="entry-container clear">
                            <header class="entry-header">
                                <div class='entry-title'>
                                    <h2 class='post-title'> <a href="<?php echo esc_url(get_the_permalink(get_the_id())); ?>"
                                            tabindex="0"><?php echo esc_html(get_the_title(get_the_id())); ?></a></h2>
                                </div>
                            </header>
                            <div class="entry-meta">
                                <?php if ($_POST['showAuthor']): ?>
                                    <span class="post-author"><i class="fas fa-user"></i>
                                    <?php echo esc_html(get_the_author_meta( $post->post_author)); ?>
                                    </a></h2></span>
                                <?php endif; ?>

                                <?php if ($_POST['showDate']): ?>
                                    <span class="post-date"><i class="fas fa-calendar"></i>
                                        <?php echo esc_html(get_the_date('', $post->ID)); ?></span>
                                <?php endif; ?>

                            </div>
                            <div class="entry-content">
                                <p>
                                    <?php echo esc_html(get_the_excerpt(get_the_id())); ?>
                                    <a href="<?php echo esc_url(get_the_permalink(get_the_id())); ?>"
                                        class="more-link"><?php echo esc_html__('Read More', 'experimental-block'); ?></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            <?php endif; ?>
            <?php if ($_POST['layout'] == 'list' && $_POST['design'] == 'one'): ?>
                <article>
                    <div class="list-item-wrapper clear">
                        <?php if (get_the_post_thumbnail_url(get_the_id()) && $_POST['showThumbnail']): ?>
                            <div class="featured-image"
                                style="background-image: url('<?php echo esc_url(get_the_post_thumbnail_url(get_the_id())); ?>');">
                            </div>
                        <?php endif; ?>
                        <div class="entry-container clear" style="width: <?php echo $_POST['showThumbnail'] ? '50%' : '100%'; ?>;">
                            <header class="entry-header">
                                <h2 class="entry-title">
                                    <a href="<?php echo esc_url(get_the_permalink(get_the_id())); ?>"
                                        tabindex="0"><?php echo esc_html(get_the_title(get_the_id())); ?></a>
                                </h2>
                            </header>
                            <div class="entry-meta">
                                <?php if ($_POST['showAuthor']): ?>
                                    <span class="post-author"><i class="fas fa-user"></i>
                                        <?php echo esc_html(get_the_author($post->ID)); ?></a></h2></span>
                                <?php endif; ?>

                                <?php if ($_POST['showDate']): ?>
                                    <span class="post-date"><i class="fas fa-calendar"></i>
                                        <?php echo esc_html(get_the_date('', $post->ID)); ?></span>
                                <?php endif; ?>

                            </div>
                            <div class="entry-content">
                                <p>
                                    <?php echo esc_html(get_the_excerpt(get_the_id())); ?>
                                    <a href="<?php echo esc_url(get_the_permalink(get_the_id())); ?>"
                                        class="more-link"><?php echo esc_html__('Read More', 'experimental-block'); ?></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            <?php endif; ?>

            <?php
        endwhile;
    else:
        echo 'no_more'; // Indicator for no more posts
    endif;

    wp_die(); // This is required to terminate the AJAX request properly
}
add_action('wp_ajax_load_more_posts', 'experimental_block_load_more_posts_ajax');
add_action('wp_ajax_nopriv_load_more_posts', 'experimental_block_load_more_posts_ajax');