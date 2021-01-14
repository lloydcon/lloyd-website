$(window).on("load", function() {
    "use strict";

    // LOADER 

    $(".preloader").fadeOut();

    // RESPONSIVE MOBILE MENU 

    $(".menu-btn").on("click", function() {
      $(".responsive-mobile-menu").toggleClass("show");
      return false;
    });

    $("html").on("click", function() {
      $(".responsive-mobile-menu").removeClass("show");
    });
    $(".menu-btn, .responsive-mobile-menu").on("click", function(e) {
      e.stopPropagation();
    })

    // CONTACT FORM VALIDATION  
    let loading = false

    if($('#contact-form').length){
      $('#submit').click(function(){

              loading = true

              // var o = new Object();
              // var form = '#contact-form';
        
              var name = $('#contact-form .name').val();
              var email = $('#contact-form .email').val();
              var message = $('#contact-form .message').val();
        
        if(name == '' || email == '' || message == '')
        {
          $('#contact-form .response').html('<div class="failed">Please fill the required fields.</div>');
          return false;
        }

        if(loading) {
          $('#contact-form .response').html('<div class="text-info"><img src="images/preloader.gif"> Loading...</div>');
        }
      
        axios.post('https://lloyd-mailer.herokuapp.com/contact-us', {
          email,
          name,
          message
        })
        .then(function (response) {
          console.log(response);
          loading = false
          $('form').trigger("reset");
          $('#contact-form .response').fadeIn().html(`<div class= "success">Message sent</div>`);
          setTimeout(function(){
              $('#contact-form .response').fadeOut("slow");
          }, 5000);

        })
        .catch(function (error) {
          console.log(error);
          $('#contact-form .response').fadeIn().html(`<div class="failed">${error.message}</div>`);
        });
    });
    }

    // NEWS LETTER
    if($('#newsletter-form').length){
      $('#news-submit').click(function(){

            loading = true
            var email = $('#newsletter-form .email').val();
        
        if(email == '')
        {
          $('#newsletter-form .response').html('<div class="failed">Please fill your email.</div>');
          return false;
        }

        if(loading) {
          $('#newsletter-form .response').html('<div class="text-info"><img src="images/preloader.gif"> Loading...</div>');
        }
      
        axios.post('https://lloyd-mailer.herokuapp.com/newsletter-subscription', {
          email
        })
        .then(function (response) {
          console.log(response);
          loading = false
          $('form').trigger("reset");
          $('#newsletter-form .response').fadeIn().html(`<div class= "success">Email sent</div>`);
          setTimeout(function(){
              $('#newsletter-form .response').fadeOut("slow");
          }, 5000);
        })
        .catch(function (error) {
          console.log(error);
          $('#newsletter-form .response').fadeIn().html(`<div class="failed">${error.message}</div>`);
        });
    });
    }

});


