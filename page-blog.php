
<?php
/*
 
Template Name: Blog
 
*/ 

?>

<?php get_header(); ?>




<div class="co-head co-head-bg-none container-fluid">
  <header class="co-head-content">
    <div class="inner">
        <h1 class="nix-top-bottom-margins h2-responsive" style="text-align: center;">Our Blog</h1>
    </div>
  </header>
</div>

<div class="main-container container-fluid">


                    
					
	

    <?php query_posts('showposts=10&category_name=blog'); ?>  
 
        <?php while (have_posts()) : the_post(); ?>  
       
     
          
                    <!--文章列表-->
                    <article class="post post-list" itemscope="" itemtype="http://schema.org/BlogPosting">
                        <div class="thumbnail">
						<a href="https://www.idevs.cn/2016/3819.html">
						
						<img src="https://www.idevs.cn/wp-content/cache/theme-thumbnail/b8b9cb4ebf841f6295e12787e5704d21-300-225.jpg" srcset="https://www.idevs.cn/wp-content/cache/theme-thumbnail/7750983233f4efd6c309ef092f74684e-600-450.jpg 2x"></a></div>                        <div class="info">
                            <h2 itemprop="name headline" class="title">
							
							 <a href="<?php the_permalink() ?>"><?php the_title(); ?> </a>
							
							</h2>
							
                            <span class="time"><?php the_time('F j, Y'); ?> </span>
                         <!--   <span class="comment">77条评论</span> -->
                            <p itemprop="post">
                              <?php // the_content(); 
							  
							  
							  
 echo mb_strimwidth(strip_tags(apply_filters('the_content', $post->post_content)), 0, 280,"……"); 
 
							  ?></p>
                        </div>
                    </article>
					   <?php endwhile;?>  
                    <div class="clearer"></div>
					
                
           
        </div>      
  
  

  


<?php get_footer(); ?>

