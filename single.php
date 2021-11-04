<?php
/**
 * The template for displaying all single posts
 *
 * @package poulton
 */
get_header(); ?>

<!-- ******************* Hero Content ******************* -->

<?php get_template_part("template-parts/hero"); ?>

<!-- ******************* Hero Content END ******************* -->

<div class="container">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

	<div class="post-card">
	
		<h2 class="heading heading__md"><a href="<?php echo get_permalink(); ?>"><?php the_title();  ?></a></h2>
		
		<p><?php the_excerpt(); ?></p>
		
		<a href="<?php the_permalink(); ?>" class="read-more">Read More</a>
	
	</div>

	<?php endwhile; endif; ?>

</div>
	
<?php get_footer(); ?>
