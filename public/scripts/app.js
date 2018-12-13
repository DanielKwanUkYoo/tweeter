/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = {};
// const data = [];

$(document).ready(function() {

  // const text = $('new-tweet').text()


  function renderTweets(tweets) {

    for (var tweet of tweets) {
      $('.tweet-container').append(createTweetElement(tweet))
    }
  }


  function createTweetElement(tweet) {

    const $tweetName = tweet.user.name;
    const $tweetAva = tweet.user.avatars["small"];
    const $tweetHandle = tweet.user.handle;
    const $tweetContent = tweet.content.text;
    const $tweetDate = tweet["created_at"];

    var $tweetHeader = $(`<header>
        <img src="${$tweetAva}" alt="avatar" align="left" width="40px" height="40px">
        <h2>${$tweetName}</h2>
        <h3>${$tweetHandle}</h3>
        </header>`);

    var $tweetP = $('<p>').text($tweetContent);
    var $lineBreak = $('<hr>')

    var $tweetFooter = $(`<footer>
        <p>${$tweetDate}</p>
      </footer>`)

    var $tweet = $('<article>').addClass('tweet')
      .append($tweetHeader)
      .append($tweetP)
      .append($lineBreak)
      .append($tweetFooter);
    return $tweet[0];
  }



  function loadTweets(){
    $.ajax({
      url:'/tweets',
      method: 'GET',
      success: function(result) {
        renderTweets(result);
      },
      error: function(error){
        console.log("error");
      }
    })
  }
  loadTweets();

// ------Composing New Tweet-------
    const errorEmpty = $('.error-message-empty');
    const errorLimit = $('.error-message-overlimit')

    $('#nav-bar .btn-compose').on('click', function(e) {
      $('.new-tweet').slideToggle(400, function(e) {
        $('.new-tweet-compose').focus();
      });
    })

    $('.container form').submit(function(e) {
    event.preventDefault();
    var newTweet = $(this).serialize();
    var content = $('.new-tweet-compose').val();
    var textVal = content.length;
    $('new-tweet-compose').text(content);

    if (content === "" || content === null) {
      errorEmpty.css({"opacity": "1"})
    } else if (textVal > 140) {
      errorLimit.css({"opacity": "1"})
    } else {
      $.post( "/tweets", newTweet)
        .then(function( data ) {
        $('.tweet-container').empty();
        loadTweets();
        errorEmpty.css({"opacity": "0"});
        errorLimit.css({"opacity": "0"});
      });
    }
  })


})
// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.