<?php
/**
 * 
 * Render Callback For Post Filter
 * 
 */

function experimental_block_post_filter_render( $attributes ) {
	
    $args = array();
    $align_class = '';
    if (isset($attributes['align'])) {
        $align_class = 'align' . $attributes['align']; 
    }
    if( $attributes['contentType'] == 'catIds' ){
        $tab_ids = array_map('intval', explode(',', $attributes['categoryIds']));
    }

    if( $attributes['contentType'] == 'tagIds' ){ 
        $tab_ids = array_map('intval', explode(',', $attributes['tagIds']));
    }
   
    $styles = [];
    $styles = [
        '--tab-align'               => $attributes['tabAlign'],
        '--font-size'               => $attributes['fontSize'].'px',			
        '--border-size'		        => $attributes['borderSize'].'px',		
        '--border-radius'			=> $attributes['radius'].'%',
        '--text-color'				=> $attributes['textColor'],
        '--active-text-color'		=> $attributes['activeTextColor'],
        '--background-color'		=> $attributes['backgroundColor'],
        '--active-background-color' => $attributes['activeBackgroundColor'],
        '--border-color'			=> $attributes['borderColor'],
        '--padding-horizontal'	    => $attributes['paddingHorizontal'].'px',
        '--padding-vertical'		=> $attributes['paddingVertical'].'px',
    ];
    
    $tab_css = '';
    foreach ($styles as $variable => $value) {
        $tab_css .= "{$variable}: {$value}; ";
    }
    
	ob_start();   
    ?>
        <div class="experimental-block-post-filter <?php echo esc_attr( $align_class );?>" style="<?php echo esc_attr($tab_css); ?>">
            <div class="experimental-block-post-filter-tab-item-wrapper">
                <ul class="experimental-block-post-filter-tab-item-lists">
                    <?php $i=1; foreach( $tab_ids as $tab_id ):
                            if ( $attributes['contentType'] == 'tagIds' ) {
                                $tag = get_tag( $tab_id );
                                
                                if ( ! is_wp_error( $tag ) && !empty($tag) ) {
                                    $tab_slug = isset( $tag->slug ) ? $tag->slug : '';
                                    $tab_name = isset( $tag->name ) ? $tag->name : '';
                                }
                            }
                            
                            if ( $attributes['contentType'] == 'catIds' ) {
                                $category = get_category( $tab_id );
                                if ( ! is_wp_error( $category ) && !empty($category) ) {
                                    $tab_slug = isset( $category->slug ) ? $category->slug : '';
                                    $tab_name = isset( $category->name ) ? $category->name : '';
                                }
                            }
                            
                    ?>
                        <li class="experimental-block-post-filter-tab-item 
                                <?php echo $i == 1 ? 'active' : '' ?>"  
                            data-tab="<?php if(isset($tab_slug)){echo esc_attr( $tab_slug );}?>"><?php if(isset($tab_name)){ echo esc_html( $tab_name );}?></li>
                    <?php $i++; endforeach; ?>
                </ul>
            </div>
            <?php
                include sprintf('%s/post-filter-list-grid-template/%s/%s-%s.php', dirname(__FILE__), $attributes['layout'], $attributes['layout'], $attributes['design']); 
            ?>
        </div>
	<?php
	$html = ob_get_clean();

	return $html;
}
