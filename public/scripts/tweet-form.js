// $(document).ready(function() {
//   $('.container form').submit(function(event) {
//     event.preventDefault();
//     var formData = $(this).serialize();
//     var content = $('.new-tweet-compose').val()
//     var textVal = content.length

//     if (content === "" || content === null || textVal > 140) {
//       alert("invalid")
//     } else {
//       $.post('/tweets', formData);

//     }
//   })
// })