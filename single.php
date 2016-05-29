<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

get_header(); ?>

<div class="co-head co-head-bg-none container-fluid">
  <header class="co-head-content">
    <div class="inner">
        <h1 class="nix-top-bottom-margins h2-responsive" style="text-align: center;">UPDATES</h1>
    </div>
  </header>
</div>

<div class="main-container container-fluid">

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		
		
		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			/*
			 * Include the post format-specific template for the content. If you want to
			 * use this in a child theme, then include a file called called content-___.php
			 * (where ___ is the post format) and that will be used instead.
			 */
			get_template_part( 'content', get_post_format() );

			// If comments are open or we have at least one comment, load up the comment template.
			//if ( comments_open() || get_comments_number() ) :
		//		comments_template();
			//endif;

			// Previous/next post navigation.
	

		// End the loop.
		endwhile;
		?>

		

		</main><!-- .site-main -->
	</div><!-- .content-area -->

	</div>
<?php get_footer(); ?>
