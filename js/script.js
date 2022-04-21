jQuery(document).ready(function($) {
    $("#mmenu").hide();
    $(".mtoggle").click(function() {
        $("#mmenu").slideToggle(500);
    });
});

function updateClock(){
    const t = getTimeRemaining(endtime);
    clock.innerHTML = 'days: ' + t.days + '<br>' +
                      'hours: '+ t.hours + '<br>' +
                      'minutes: ' + t.minutes + '<br>' +
                      'seconds: ' + t.seconds;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  
  updateClock(); // run function once at first to avoid delay
  var timeinterval = setInterval(updateClock,1000);