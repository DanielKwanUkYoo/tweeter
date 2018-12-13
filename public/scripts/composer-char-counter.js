$(document).ready(function(){

  $('.new-tweet-compose').on('keyup', function(event) {
    const charcRemaining = 140 - $(this).val().length;
    const counter = $(this).siblings('.counter');
    counter.text(charcRemaining);

    if (charcRemaining < 0) {
      counter.css({"color": "red"})
    } else {
      counter.css({"color": "black"})
    }

  })
})

