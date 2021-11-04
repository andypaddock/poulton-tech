<?php
/**
 * The template for displaying search results pages
 *
 * @package poulton
 */

get_header(); ?>

<!-- ******************* Hero Content ******************* -->

<?php get_template_part("template-parts/hero"); ?>

<!-- ******************* Hero Content END ******************* -->

<?php global $wp_query; ?>

<div class="search-header mt3 mb3">

	<h2 class="heading__md"><?php _e( 'You searched for', 'locale' ); ?> '<?php the_search_query(); ?>'</h2>

	<p>We found <?php echo $wp_query->found_posts; ?>  results</p>

</div>

<div class="container">
	
	<?php if(have_posts()): while(have_posts()): the_post(); ?>

	<div class="search-card">
	
		<h2 class="heading heading__md"><a href="<?php echo get_permalink(); ?>"><?php the_title();  ?></a></h2>
		
		<p><?php the_excerpt(); ?></p>
		
		<a href="<?php the_permalink(); ?>" class="read-more">Read More</a>
	
	</div>
	
	<?php endwhile; endif; ?>

</div>

<?php get_footer(); ?>
