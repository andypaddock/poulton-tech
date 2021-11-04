<div class="section" data-anchor="introducing" data-link="intro">
	<?php $image = get_sub_field('text_image');?>
    <div class="container cols-6-6-12 cols-offset-lg-6-18 pt8">
    	<div class="col"></div>
        <div class="col">
            <div class="heading heading__lg heading__caps mb1"><?php the_sub_field('title');?></div>
            <img src="<?php echo esc_url($image['url']);?>" class="ptIcon"/>
        </div>
        <div class="col">
        	<h1 class="heading heading__lg mt0 m-lg-b2"><?php the_sub_field('heading_paragraph');?></h1>
        	
            <div class="text_details">
                <div class="list list__no-padding list__style-line">
                    <?php the_sub_field('content');?>
                </div>
            </div>
                
        </div>
    </div>
</div>