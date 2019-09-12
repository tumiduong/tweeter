/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


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
    
      <p>${tweet.content.text}.</p>
    
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
    console.log($tweetsContainer)
    }
  }

  renderTweets(data);
});