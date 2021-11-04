<?php
/**
 * ============== Template Name: Home Page
 *
 * @package poulton
 */
get_header();?>

	<?php get_template_part('template-parts/three');?>

<?php /* 


 */ ?>

    <div id="fullpage" >



    	<?php if( have_rows('introducing') ):
    		while ( have_rows('introducing') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-intro');?>
    	<?php endwhile; endif;?>


    	<?php if( have_rows('size_&_mass') ):
    		while ( have_rows('size_&_mass') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-size_mass');?>
    	<?php endwhile; endif;?>


    	<?php if( have_rows('rugged') ):
    		while ( have_rows('rugged') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-rugged');?>
    	<?php endwhile; endif;?>

        
        <?php if( have_rows('fireproof') ):
    		while ( have_rows('fireproof') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-fireproof');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('metal_metal') ):
    		while ( have_rows('metal_metal') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-metal');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('welding') ):
    		while ( have_rows('welding') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-welding');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('pressure') ):
    		while ( have_rows('pressure') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-pressure');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('integrity') ):
    		while ( have_rows('integrity') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-integrity');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('cost') ):
    		while ( have_rows('cost') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-cost');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('type') ):
    		while ( have_rows('type') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-type');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('patented') ):
    		while ( have_rows('patented') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-patented');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('installation') ):
    		while ( have_rows('installation') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-installation');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('safer') ):
    		while ( have_rows('safer') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-safer');?>
    	<?php endwhile; endif;?>

    	<?php if( have_rows('benefits') ):
    		while ( have_rows('benefits') ) : the_row();
    	?>
    	<?php get_template_part('template-parts/home-benefits');?>
    	<?php endwhile; endif;?>
    </div>

	
	<div id="c"></div>

	<div id="see_applications--section">
		<?php if( have_rows('benefits') ):
				while ( have_rows('benefits') ) : the_row();
			?>
					<a href="<?php the_sub_field('page_link')?>" 
					style="pointer-events : all;"
					class="button button__transparent button__border-left button__border-right button__border-primary button__border-round">
					See applications for the PT1</a>
					
			<?php endwhile; endif;?>
	</div>


	<div id="floating-island-labels">
		
		<?php get_template_part('template-parts/floating-island-labels');?>

	</div>


<?php //get_template_part('template-parts/animation-container');?>

<?php get_footer();?>