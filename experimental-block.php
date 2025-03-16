<?php
/**
 * Plugin Name:       Experimental Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       experimental-block
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function experimental_block_block_init(): void
{
	// register_block_type( __DIR__ . '/build/slider' );
	// register_block_type( __DIR__ . '/build/slides' );

	register_block_type(__DIR__ . '/build/star-icon');

	register_block_type(__DIR__ . '/build/icon-picker');

	register_block_type(__DIR__ . '/build/post-slider', array(
		'render_callback' => 'experimental_block_post_slider_render'
	));

	register_block_type(__DIR__ . '/build/video-popup', array(
		'render_callback' => 'experimental_block_video_popup_render'
	));

	register_block_type(__DIR__ . '/build/post-ticker', array(
		'render_callback' => 'experimental_block_post_ticker_render'
	));

	register_block_type(__DIR__ . '/build/post-list-grid', array(
		'render_callback' => 'experimental_block_post_list_grid_render'
	));

	register_block_type(__DIR__ . '/build/post-filter', array(
		'render_callback' => 'experimental_block_post_filter_render'
	));

	register_block_type(__DIR__ . '/build/accordion');
	register_block_type(__DIR__ . '/build/accordion-item');
	register_block_type(__DIR__ . '/build/counter');
	register_block_type(__DIR__ . '/build/progress-bar');
	register_block_type(__DIR__ . '/build/breadcrumb', array(
		'render_callback' => 'experimental_block_breadcrumb_render'
	));

	register_block_type(__DIR__ . '/build/advance-gallery');
	register_block_type(__DIR__ . '/build/social-share');
	register_block_type(__DIR__ . '/build/text-marquee');
	register_block_type(__DIR__ . '/build/back-to-top');
	register_block_type(__DIR__ . '/build/map');
	register_block_type(__DIR__ . '/build/modal');
	register_block_type(__DIR__ . '/build/separator');
	register_block_type(__DIR__ . '/build/tabs');
	register_block_type(__DIR__ . '/build/tab-item');
	register_block_type(__DIR__ . '/build/loader');
	register_block_type(__DIR__ . '/build/category-list');
	register_block_type(__DIR__ . '/build/read-time', array(
		'render_callback' => 'experimental_block_read_time_render'
	));
	register_block_type(__DIR__ . '/build/date', array(
		'render_callback' => 'experimental_block_date_render'
	));
	register_block_type(__DIR__ . '/build/weather', array(
		'render_callback' => 'experimental_block_weather_render'
	));

	register_block_type(__DIR__ . '/build/testimonial');
	register_block_type(__DIR__ . '/build/testimonials');

	register_block_type(__DIR__ . '/build/team');
	register_block_type(__DIR__ . '/build/teams');

	register_block_type(__DIR__ . '/build/slider');
	register_block_type(__DIR__ . '/build/slides');
}

add_action('init', 'experimental_block_block_init');
add_action('wp_enqueue_scripts', 'block_scripts');

function block_scripts()
{

	wp_enqueue_style('fontawesome-css', plugin_dir_url(__FILE__) . 'assets/font-awesome/css/fontawesome-all.min.css');

	wp_enqueue_script('splide-js', plugin_dir_url(__FILE__) . 'assets/splide/js/splide.min.js', array('jquery'), '', true);
	wp_enqueue_style('splide-css', plugin_dir_url(__FILE__) . 'assets/splide/css/splide.min.css');

	wp_enqueue_style('magnific-popup', plugin_dir_url(__FILE__) . 'assets/css/magnific-popup.css');
	wp_enqueue_script('magnific-popup', plugin_dir_url(__FILE__) . 'assets/js/magnific-popup.js', array('jquery'), '', true);


	wp_enqueue_script('jquery-marquee', plugin_dir_url(__FILE__) . 'assets/js/jquery-marquee.js', array('jquery'), '', true);

	wp_enqueue_style('experimental-block-custom-css', plugin_dir_url(__FILE__) . 'assets/css/custom.css');
	
	wp_enqueue_script('experimental-block-custom-js', plugin_dir_url(__FILE__) . 'assets/js/custom.js', array('jquery'), '', true);
	// wp_add_inline_script('experimental-block-custom-js', "console.log('loaded in header');");
	
	wp_localize_script('experimental-block-custom-js', 'ajaxfilter', array(
		'ajaxurl' => admin_url('admin-ajax.php'),
	));

	wp_enqueue_script('accordino-js', plugin_dir_url(__FILE__) . 'assets/js/accordino.js', array('jquery'), '', true);
	wp_enqueue_script('progressbar-js', plugin_dir_url(__FILE__) . 'assets/js/progressbar.js', array('jquery'), '', true);

}

function editor_block_scripts()
{
	wp_enqueue_style('fontawesome-css', plugin_dir_url(__FILE__) . 'assets/font-awesome/css/fontawesome-all.min.css');

}

add_action('enqueue_block_editor_assets', 'editor_block_scripts');

include sprintf('%s/inc/render-callback/video-popup.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/post-slider.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/post-ticker.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/post-filter.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/post-list-grid.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/breadcrumb.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/read-time.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/date.php', dirname(__FILE__));
include sprintf('%s/inc/render-callback/weather.php', dirname(__FILE__));
include sprintf('%s/inc/breadcrumb-class.php', dirname(__FILE__));
