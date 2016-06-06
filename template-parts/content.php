<?php
/**
 * The template part for displaying content
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php if ( is_sticky() && is_home() && ! is_paged() ) : ?>
<<<<<<< HEAD
			<span class="sticky-post"><?php _e( 'Featured', 'Yunqiit' ); ?></span>
=======
			<span class="sticky-post"><?php _e( 'Featured', 'twentysixteen' ); ?></span>
>>>>>>> 50c96aaf4076fc52fcc91183a2bf81d0ef600329
		<?php endif; ?>

		<?php the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
	</header><!-- .entry-header -->

<<<<<<< HEAD
	<?php Yunqiit_excerpt(); ?>

	<?php Yunqiit_post_thumbnail(); ?>
=======
	<?php twentysixteen_excerpt(); ?>

	<?php twentysixteen_post_thumbnail(); ?>
>>>>>>> 50c96aaf4076fc52fcc91183a2bf81d0ef600329

	<div class="entry-content">
		<?php
			/* translators: %s: Name of current post */
			the_content( sprintf(
<<<<<<< HEAD
				__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'Yunqiit' ),
=======
				__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'twentysixteen' ),
>>>>>>> 50c96aaf4076fc52fcc91183a2bf81d0ef600329
				get_the_title()
			) );

			wp_link_pages( array(
<<<<<<< HEAD
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'Yunqiit' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
				'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'Yunqiit' ) . ' </span>%',
=======
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'twentysixteen' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
				'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>%',
>>>>>>> 50c96aaf4076fc52fcc91183a2bf81d0ef600329
				'separator'   => '<span class="screen-reader-text">, </span>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
<<<<<<< HEAD
		<?php Yunqiit_entry_meta(); ?>
=======
		<?php twentysixteen_entry_meta(); ?>
>>>>>>> 50c96aaf4076fc52fcc91183a2bf81d0ef600329
		<?php
			edit_post_link(
				sprintf(
					/* translators: %s: Name of current post */
<<<<<<< HEAD
					__( 'Edit<span class="screen-reader-text"> "%s"</span>', 'Yunqiit' ),
=======
					__( 'Edit<span class="screen-reader-text"> "%s"</span>', 'twentysixteen' ),
>>>>>>> 50c96aaf4076fc52fcc91183a2bf81d0ef600329
					get_the_title()
				),
				'<span class="edit-link">',
				'</span>'
			);
		?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
