$('.tab-item').click(function () {
    $('.collapse').collapse('hide');
  });

  $('.carousel').carousel({
    interval: 2000
  });
  
  $('body').on('load', $(".commentGroup").hide());

  $("#btnFooterToggle").click(function(){
    $(".commentGroup").toggle();
  });

  $('#addComment').click(function(){
    $(".commentGroup").toggle();
  });


