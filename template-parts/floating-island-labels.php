<?php if( have_rows('size_&_mass') ): while ( have_rows('size_&_mass') ) : the_row();  ?>


                                                                                                                                                                              
    <div class="map-item" id="ptone_row_item_2_3">
        <div class="floating-label">
            <?php the_sub_field('label_pt1');?>
        </div>
        <img src="/wp-content/themes/poulton-tech/inc/img/logo_O_line.svg" >       
    </div>
    <div class="map-item" id="flange_row_item_2_2">
        <div class="floating-label">
            <?php the_sub_field('label_flange');?>
        </div>
        <img src="/wp-content/themes/poulton-tech/inc/img/logo_O_line.svg" >       
    </div>


<?php endwhile; endif;?>

