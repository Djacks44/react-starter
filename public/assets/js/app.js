   jQuery( function() {
      jQuery(document).ready(function () {
          var jQuerycontainer = jQuery('.blog-entries').imagesLoaded( function() {
            // initialize Packery after all images have loaded
            jQuerycontainer.packery({
              itemSelector: '.item',
              gutter: 0
            });
          });
      });
  });  

$(".filters a").on("click", function(){
  filter_option = "." + $(this).attr("data-target").toString();
  $('.item').not(filter_option).fadeTo(300,0.1);
  $(filter_option).fadeTo(300,1);
})

  jQuery(window).load(function() {
    jQuery('.recipe-slider.flexslider').flexslider({
      animation: "fade",
      controlNav: false,
      prevText: "",
      nextText: "",
      useCSS:false
    });
  });

 jQuery(document).ready(function() { 
    var width = jQuery(window).width();
      console.log(width);
      if(width <= 1025){
          jQuery("#mainnav").hide();
          jQuery('#mainnav').addClass('mobilemenu');
      }
      else {
          jQuery("#mainnav").show();
          jQuery('#mainnav').removeClass('mobilemenu');
      }
    jQuery(window).resize(function(){
      var width = jQuery(window).width();
      console.log(width);
      if(width <= 1025){
          jQuery("#mainnav").hide();
          jQuery('#mainnav').addClass('mobilemenu');
      }
      else {
          jQuery("#mainnav").show();
          jQuery('#mainnav').removeClass('mobilemenu');
      }
    });
    
    jQuery("#showmobilemenu").click(function() {
      jQuery("ul.mobilemenu").slideToggle("fast");
      return false;
    });
  });    

jQuery(document).ready(function(jQuery){
    var jQuerytimeline_block = jQuery('.cd-timeline-block');

    //hide timeline blocks which are outside the viewport
    jQuerytimeline_block.each(function(){
        if(jQuery(this).offset().top > jQuery(window).scrollTop()+jQuery(window).height()*0.75) {
            jQuery(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        }
    });

    //on scolling, show/animate timeline blocks when enter the viewport
    jQuery(window).on('scroll', function(){
        jQuerytimeline_block.each(function(){
            if( jQuery(this).offset().top <= jQuery(window).scrollTop()+jQuery(window).height()*0.75 && jQuery(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
                jQuery(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            }
        });
    });
});


// creates profile functionality


$(document).ready(function(){
  var $Menu = $('.Img');
  $('.Img').mouseenter(function() {
        $('.PopUp').css('opacity', '1');
    $('.PopUp').css('margin-top', '20px');
    });
    $('.Img').mouseleave(function() {
        $('.PopUp').css('opacity', '0');
    $('.PopUp').css('margin-top', '0px');
    });
  $('.Img').on('click', function() {
    if($Menu.hasClass('Img')){
        $('.Img').addClass('click');
    $('.Img').removeClass('Img');
        $('.Profile').addClass('clickProfile');
        $('.Profile').removeClass('Profile');
        $('.clickPopUp').css('display', 'block');
        $('.PopUp').css('display', 'none');
    }else{
    $('.click').addClass('Img');
    $('.click').removeClass('click');
        $('.clickProfile').addClass('Profile');
        $('.clickProfile').removeClass('clickProfile');
                $('.clickPopUp').css('display', 'none');
        $('.PopUp').css('display', 'block');
      }
    });

  });

// hides divs

$(document).ready(function(){

      $('.plan').hide();

      $('.planAnchor').click(function(){
        $('.plan').show();
        $('.clickPopUp').css('display', 'none');
      });

      $('.Img').click(function(){
        $('.plan').hide();
      });
      // $('.accountAnchor').click(function(){
      //   $('#accountSettings').show();
      //   $('.plan').hide();
      // }
    });
