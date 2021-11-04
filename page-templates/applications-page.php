<?php
/**
 * ============== Template Name: Applications Page
 *
 * @package poulton
 */
get_header();?>

<?php if( have_rows('hero') ):
    while ( have_rows('hero') ) : the_row();
?>
	<?php get_template_part('template-parts/_hero');?>
<?php endwhile; endif;?>

<div class="container cols-offset-4-16 cols-offset-xl-2-22 cols-sm-24 pt5">
	<div class="col container cols-12 cols-offset-sm-1-22 grid-gap">
		<?php if( have_rows('content') ):
	            while ( have_rows('content') ) : the_row();
	        ?>
		<div class="col">
			<h2 class="heading heading_md mr1 ml2 m-sm-l0 m-sm-r0 slide-up"><?php the_sub_field('heading');?></h2>
		</div>
		<div class="col list list__style-line list__min-padding slide-up delay">
			<?php the_sub_field('content');?>
			<div class="align-sm-center m-sm-b2">
				<a href="<?php the_sub_field('page_link')?>" class="button button__transparent button__border-left button__border-right button__border-primary button__border-round button__animation">See Specifications for the PT1</a>
			</div>
		<div>
			<?php endwhile; endif;?>
	</div>
</div>

<?php get_footer();?>