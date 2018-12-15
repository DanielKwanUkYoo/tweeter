$(document).ready(function() {

  // var moment = require('moment')
  function renderTweets(tweets) {

    for (var tweet of tweets) {
      $('.tweet-container').prepend(createTweetElement(tweet))
    }
  }

  function createTweetElement(tweet) {

    const $tweetName = tweet.user.name;
    const $tweetAva = tweet.user.avatars["small"];
    const $tweetHandle = tweet.user.handle;
    const $tweetContent = tweet.content.text;
    const $tweetDate = tweet["created_at"];

    var $tweetHeader = $(`<header>
        <img src="${$tweetAva}" alt="avatar">
        <h2>${$tweetName}</h2>
        <h3>${$tweetHandle}</h3>
        </header>`);
    var $tweetP = $('<p>').text($tweetContent);
    var $lineBreak = $('<hr>')
    var $tweetFooter = $(`<footer>
        <p>${moment($tweetDate).fromNow()}</p>
        <div class="icons">
        <img src="/images/flag.png" alt="flag">
        <img src="/images/heart.png" alt="like">
        <img src="/images/refresh.png" alt="refresh">
        </div>
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

// ------Composing New Tweet-------
    const errorEmpty = $('.error-message-empty');
    const errorLimit = $('.error-message-overlimit');
    const tweetBtn = $('#nav-bar .btn-compose');
    const textarea = $('.new-tweet-compose');

    tweetBtn.on('click', function(e) {
      $('.new-tweet').slideToggle(400, function(e) {
        $('.new-tweet-compose').focus();
      });
    })
// -------Handler for submitting-----
    $('.container form').submit(function(e) {
    event.preventDefault();
    var newTweet = $(this).serialize();
    var content = textarea.val();
    var textVal = content.length;

// ------Conditions before posting-----
    if (content === "" || content === null) {
      errorEmpty.css({"opacity": "1"})
    } else if (textVal > 140) {
      errorLimit.css({"opacity": "1"})
    } else {
      $.post( "/tweets", newTweet)
        .then(function( data ) {
        $('.tweet-container').empty();
        loadTweets();
        textarea.val('');
        errorEmpty.css({"opacity": "0"});
        errorLimit.css({"opacity": "0"});
      });
    }
  })
  loadTweets();
})
