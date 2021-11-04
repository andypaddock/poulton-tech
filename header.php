<?php /** Header @package poulton */ ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>

<meta charset="UTF-8">
<meta name="description" content=" ">
<meta name="keywords" content=" ">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Poulton Technologies</title>

<link rel="stylesheet" href="https://use.typekit.net/pmw6aty.css"><!--TYPEKIT INJECT-->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" type="image/x-icon" />

<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

	<div id="page" class="site-wrapper">

<header>
    <nav id="nav">
        <div class="container cols-12-12 cols-sm-8-16 pt1 pb1 p-xl-l1 p-xl-r1 border border__bottom border__dotted align-vert-c">
            <div class="col">
                <div class="menu-trigger">
                   <button class="hamburger hamburger--spin" type="button">
                      <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                      </span>
                    </button>
                    <div class="menuText">
                        Menu
                    </div>
                    <div class="menuText hideItem">
                        Close
                    </div>
                </div>
            </div>
            <div class="col">
                <a href="<?php echo get_home_url(); ?>"><?php get_template_part('inc/img/logo', 'logo');?></a>
            </div>
        </div>
    </nav>
    <?php if ( is_page_template( 'page-templates/home.php' ) ) {;?>
    <div class="on-page-nav">
        <div class="container">
            <div class="col">
                <div class="menu">
                    <button type="button" name="button" id="prevSection">PREVIOUS!</button>
                    <ul id="myMenu">
                        <?php if( have_rows('introducing') ):
                            while ( have_rows('introducing') ) : the_row();
                        ?>
                    	   <li id="intro"><a href="#introducing"><span class="nav-line"></span><span class="nav-content">Introducing the PT1</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('size_&_mass') ):
                            while ( have_rows('size_&_mass') ) : the_row();
                        ?>
                    	   <li id="sizeMass"><a href="#size"><span class="nav-line"></span><span class="nav-content">Size &amp; Mass</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('rugged') ):
                            while ( have_rows('rugged') ) : the_row();
                        ?>
                    	   <li id="ruggedLink"><a href="#rugged"><span class="nav-line"></span><span class="nav-content">Rugged</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('fireproof') ):
                            while ( have_rows('fireproof') ) : the_row();
                        ?>
                            <li id="fireLink"><a href="#fireproof"><span class="nav-line"></span><span class="nav-content">Fire Proof</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('metal_metal') ):
                            while ( have_rows('metal_metal') ) : the_row();
                        ?>
                            <li id="metalLink"><a href="#metal"><span class="nav-line"></span><span class="nav-content">Metal to Metal Seal</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('welding') ):
                            while ( have_rows('welding') ) : the_row();
                        ?>
                            <li id="weldingLink"><a href="#welding"><span class="nav-line"></span><span class="nav-content">No Welding Required</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('pressure') ):
                            while ( have_rows('pressure') ) : the_row();
                        ?>
                            <li id="pressureLink"><a href="#pressure"><span class="nav-line"></span><span class="nav-content">Pressure Test</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('integrity') ):
                            while ( have_rows('integrity') ) : the_row();
                        ?>
                            <li id="integrityLink"><a href="#integrity"><span class="nav-line"></span><span class="nav-content">Pipe Integrity</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('cost') ):
                            while ( have_rows('cost') ) : the_row();
                        ?>
                            <li id="costLink"><a href="#cost"><span class="nav-line"></span><span class="nav-content">Cost &amp; Value</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('type') ):
                            while ( have_rows('type') ) : the_row();
                        ?>
                            <li id="typeLink"><a href="#type"><span class="nav-line"></span><span class="nav-content">Type Approval</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('patented') ):
                            while ( have_rows('patented') ) : the_row();
                        ?>
                            <li id="patentedLink"><a href="#patented"><span class="nav-line"></span><span class="nav-content">Patented</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('installation') ):
                            while ( have_rows('installation') ) : the_row();
                        ?>
                            <li id="installationLink"><a href="#installation"><span class="nav-line"></span><span class="nav-content">Installation</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('safer') ):
                            while ( have_rows('safer') ) : the_row();
                        ?>
                    	   <li id="betterLink"><a href="#safer"><span class="nav-line"></span><span class="nav-content">Better</span></a></li>
                        <?php endwhile; endif;?>

                        <?php if( have_rows('benefits') ):
                            while ( have_rows('benefits') ) : the_row();
                        ?>
                           <li id="benefitsLink"><a href="#benefits"><span class="nav-line"></span><span class="nav-content">Benefits</span></a></li>
                        <?php endwhile; endif;?>
                    </ul>
                    <a href="#" id="nextSection"><?php get_template_part('inc/img/navButton', 'navButton');?></a>
                </div>
            </div>
        </div>
    </div>
<?php };?>
</header>

<div class="offscreen-nav">
    <div class="container cols-offset-12-12 cols-offset-sm-4-16">
        <div class="col mainMenuContainer">
            <?php
            wp_nav_menu(array(
                'theme_location'  => 'main-menu',
                'container_class' => 'mainMenu pt7 pb5'
            ));
            ?>
        </div>
    </div>
</div>


		<main><!--closes in footer.php-->
