<?php $image = get_sub_field('title_image');
	$hero_image = get_sub_field('hero_image');?>
<section class="hero__container slow-fade" style="background-image:url(<?php echo esc_url($hero_image['url']);?>);"/>
	<div class="container h50 mt5 cols-offset-12-12 cols-offset-sm-2-20 align-vert-c">
		<div class="col slide-up">
			<h1 class="heading heading__lg heading__caps"><?php the_sub_field('title');?></h1>
			<img src="<?php echo esc_url($image['url']);?>"/>
		</div>
	</div>
</section>