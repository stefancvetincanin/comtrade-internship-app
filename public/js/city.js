$(document).ready(function () {
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
});

//setting the date
let currentDate = new Date();	
document.getElementById('date').textContent = stringDate(currentDate);
  
function stringDate(currDate) {
  let mm = currDate.getMonth()+1;
      mm = (mm < 10 ? `0${mm}` : mm);
  let dd = currDate.getDate();
      dd = (dd < 10 ? `0${dd}` : dd);
  return `${dd}/${mm}/${currDate.getFullYear()}`;
}

