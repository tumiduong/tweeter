$(document).ready(function() {
  const $tweetbox = $("input.tweet-box");

  $tweetbox.on("keyup", function() {
    let tweetLength = $(this).val().length;
    let totalChar = 140;
    let charLeft = totalChar - tweetLength;
    $('span.counter').text(charLeft);

    if (charLeft < 0) {
      $('span.counter').css("color", "red");
    } else {
      $('span.counter').css("color", "#414141");
    }
  });

});
