/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  let $tweetsContainer = $("div#tweets-container");

  const createTweetElement = (tweet) => {
    let $tweet = `
    <article class="tweet">
      <header> 
        <img src="${tweet.user.avatars}">
        <p>${tweet.user.name}</p>
        <p class="user">${tweet.user.handle}</p>
      </header>
      
        <p>${tweet.content.text}</p>
      
       <footer>
        <p>${tweet.created_at}</p>
      </footer>
    </article>
    `;
    return $tweet;
    }
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
    }
  }

  const loadTweets = (method, url, cb) => {
    $.ajax({
      method,
      url
    })
    .done(response => {
      cb(response);
    })
    .fail(error => console.log(error))
    .always(() => console.log("load completed."));
  }

  loadTweets("GET", "/tweets/", renderTweets);

  const tweetForm = $(".new-tweet-form");

  tweetForm.on("submit", (event) => {
    console.log("about to submit form")
    event.preventDefault();
    
    $.ajax({
     type: "POST",
     url: "/tweets/",
     data: {
       text: $(".tweet-box").val()
      }
    })
    .done(response => { console.log("done") })
    .fail(error => { console.log(error) })
    .always(console.log("completed"))
  })


}); //end of doc.ready
