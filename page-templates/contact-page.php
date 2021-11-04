<?php
/**
 * ============== Template Name: Contact Page
 *
 * @package poulton
 */
get_header();?>
<?php if( have_rows('hero') ):
    while ( have_rows('hero') ) : the_row();
?>
	<?php get_template_part('template-parts/_hero');?>
<?php endwhile; endif;?>


<div class="container cols-offset-4-16 cols-offset-xl-2-22 pt5">
	<div class="col container cols-18-6 cols-xl-16-8 cols-sm-24 grid-gap">
		<div class="col">
			<h3 class="heading heading__md heading__primary heading__caps font400">Get In Touch</h3>
			<div class="form slow-fade">
				<?php echo do_shortcode( '[contact-form-7 id="5" title="Contact form 1"]' ); ?>
			</div>
		</div>
		<div class="col p-sm-l5 slow-fade delay">
			<h3 class="heading heading__md heading__primary heading__caps font400">More Info</h3>
			<div class="pb1"><?php the_field('address', 'options');?></div>
			<div class="font400"><a href="tel:<?php the_field('telephone', 'options');?>"><?php the_field('telephone', 'options');?></a></div>
			<?php if( have_rows('social', 'options') ):;?>
				<ul class="social mt2 mb2">
			    <?php while ( have_rows('social', 'options') ) : the_row();
			    	$image = get_sub_field('icon');
				?>
				
					<li><a href="<?php the_sub_field('link');?>"><img src="<?php echo esc_url($image['url']);?>"/></a></li>
				<?php endwhile;?>
				</ul>
			<?php endif;?>
		<div>
	</div>
</div>

<?php get_footer();?>