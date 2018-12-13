/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}
const data = [];

$(document).ready(function() {

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


    var $tweet = $('<article>').addClass('tweet').html(
      `<header>
        <img src="${$tweetAva}" alt="avatar" align="left" width="40px" height="40px">
        <h2>${$tweetName}</h2>
        <h3>${$tweetHandle}</h3>
      </header>
        <p>${$tweetContent}</p><hr>
      <footer>
        <p>${$tweetDate}</p>
      </footer>`
    )
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


    $('.container form').submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    var content = $('.new-tweet-compose').val();
    var textVal = content.length;

    if (content === "" || content === null || textVal > 140) {
      alert("invalid")
    } else {
      $.post( "/tweets", formData)
        .then(function( data ) {
        $('.new-tweet-compose').val('');
        $('.tweet-container').empty();
        loadTweets();
      });
    }
  })


})
// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.