<div class="section" data-anchor="fireproof" data-link="fireLink">
	<?php $image = get_sub_field('image');?>
    <div class="container cols-6-6-12 cols-offset-lg-6-18 pt8">
    	<div class="col"></div>
        <div class="col">
            <div class="heading heading__lg heading__caps mb1"><?php the_sub_field('title');?></div>
            <img src="<?php echo esc_url($image['url']);?>" class="ptIcon"/>
        </div>
        <div class="col">
        	<h2 class="heading heading__lg heading__caps heading__primary mt0 m-lg-t2 m-sm-t1"><?php the_sub_field('heading');?></h2>
        	<div class="container cols-18">
        		<div class="col">
	        		<h3 class="heading heading__lg mt0"><?php the_sub_field('sub_heading');?></h3>
	        	</div>
        	</div>
        	<div class="text_details">
        		<?php the_sub_field('content');?>
        	</div>
        </div>
    </div>
</div>