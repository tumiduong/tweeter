/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$( document ).ready(function() {

  // toggle the "Write a new tweet" button
  $("#toggle-tweet").click((display) => {
    $(".new-tweet").slideToggle(display);
  })

  // writing/displaying tweets
  let $tweetsContainer = $("div#tweets-container");

  // allowing only text in tweet
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }  

  // finding 'days ago' function
  const daysAgo = (ms) => {
    let today = Date.now();
    let oneDay = 86400000;
    let timeDiff = today - ms;
    let daysPassed = timeDiff / oneDay;
    return Math.round(daysPassed);
  }

  // tweet template
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
        <p>${escape(daysAgo(tweet.created_at))} days ago
        <img src="/images/report.png">
        <img src="/images/retweet.png">
        <img src="/images/fave.png">
        </p>
        
      </footer>
    </article>`;
    return $tweet;
  }
  
  // iterating through data to print out the tweets
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

  // loading tweets on page load
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

  // loading the last tweet only when submitting new tweet
  const loadLastTweet = (method, url, cb) => {
    $.ajax({
      method,
      url
    })
    .done(response => { cb(response[response.length - 1]) })
    .fail(error => console.log(error))
    .always(() => console.log("load completed."))
  }

  // new tweet text box
  const tweetForm = $(".new-tweet-form");
  const $emptyError = $("p#empty-error");
  const $longError = $("p#long-error");

  // nothing to submit error
  const tweetEmptyError = () => {
    if ($emptyError.first().is(":hidden")) {
      $emptyError.slideToggle();
      $emptyError.css("display", "flex");
    }
  }

  // too many characters error
  const tweetTooLongError = () => {
    if ($longError.first().is(":hidden")) {
      $longError.slideToggle();
      $longError.css("display", "flex");
    }
  }

  // clear errors
  const clearError = () => {
    if ($emptyError.first().is(":visible")) {
      $emptyError.slideUp();
      $emptyError.css("display", "none");
    }
    if ($longError.first().is(":visible")) {
      $longError.slideUp();
      $longError.css("display", "none");
    }
  }

  // on new tweet submission
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
       .done(response => {
          loadLastTweet("GET", "/tweets/", renderTweets);
          tweetForm[0].reset();
          clearError();
        })
       .fail(error => {
        if (!$(".tweet-box").val()) {
          clearError();
          tweetEmptyError();
        } else {
          console.log(error)
        }
        })
       .always(console.log("completed"))
    } else if (($(".tweet-box").val()).length > 140) {
      clearError();
      tweetTooLongError();
    }
  })

}); //end of doc.ready
