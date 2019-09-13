/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  let $tweetsContainer = $("div#tweets-container");

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }  

  const createTweetElement = (tweet) => {
    let $tweet =
    `<article class="tweet">
      <header> 
        <img src="${escape(tweet.user.avatars)}">
        <p>${escape(tweet.user.name)}</p>
        <p class="user">${escape(tweet.user.handle)}</p>
      </header>
      
        <p>${escape(tweet.content.text)}</p>
      
       <footer>
        <p>${escape(tweet.created_at)}</p>
      </footer>
    </article>`;
    return $tweet;
    }
  
  const renderTweets = function(tweets) {
    if (!Array.isArray(tweets)) {
      const $tweet = createTweetElement(tweets);
      $tweetsContainer.prepend($tweet);
    } else {
      for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
      }
    }
  }

  const loadTweets = (method, url, cb) => {
    $.ajax({
      method,
      url
    })
    .done(response => { cb(response) })
    .fail(error => console.log(error))
    .always(() => console.log("load completed."));
  }

  loadTweets("GET", "/tweets/", renderTweets);

  const loadLastTweet = (method, url, cb) => {
    $.ajax({
      method,
      url
    })
    .done(response => { cb(response[response.length - 1]) })
    .fail(error => console.log(error))
    .always(() => console.log("load completed."))
  }

  const tweetForm = $(".new-tweet-form");

  tweetForm.on("submit", (event) => {
    console.log("about to submit form")
    event.preventDefault();

    if (($(".tweet-box").val()).length <= 140) {
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: {
          text: $(".tweet-box").val()
         }
       })
       .done(response => { loadLastTweet("GET", "/tweets/", renderTweets) })
       .fail(error => {
        if (!$(".tweet-box").val()) {
          alert("Can't tweet unless you write something!");
        } else {
          console.log(error)
        }
        })
       .always(console.log("completed"))
    } else if (($(".tweet-box").val()).length > 140) {
      alert("Hey! Your message is too long.");
    }
  })
}); //end of doc.ready
