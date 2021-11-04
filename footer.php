<?php
/**
 * The template for displaying the footer
 * @package poulton
 */
?>

</main>

<footer class="footer">

	<div class="socket">

		<div class="container cols-8 p-xl-l1 p-xl-r1 cols-sm-24 ">

			<div class="col colophon">Copyright &copy; <?php echo date ('Y');?> Poulton Technologies</div>

			<div class="col poulton">

				<a href="https://poulton.co.uk"><?php get_template_part('inc/img/silverless', 'logo');?></a>

			</div>

			<div class="col mandatory">

				<a href="<?php echo home_url() . '/terms-conditions'; ?>">Terms</a>

				<span class="divider">|</span>

				<a href="<?php echo home_url() . '/privacy-policy'; ?>">Privacy</a>

			</div>

		</div>

	</div>

	</div><!--socket-->

</footer>

</div><!-- #page -->

<?php wp_footer(); ?>

<script>

</script>

</body>

</html>
