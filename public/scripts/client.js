/* eslint-disable quotes */
/* eslint-disable quote-props */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// eslint-disable-next-line prefer-arrow-callback
$(document).ready(function() {
  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(res) {
        renderTweets(res);
      }
    });
  };

  // get character limit for tweet post
  const counter = Number($('#counter').val());
  // eslint-disable-next-line prefer-arrow-callback
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    if ($(this).serialize() !== 'text=') {
      const postText = $(this).serialize();
      const currCounter = Number($('#counter').val());
      if (currCounter <= counter && currCounter >= 0) {
        $.ajax({
          type: 'POST',
          url: '/tweets',
          data: postText,
          success: function(data) {},
          error: function(data, textStatus, errorThrown) {
            console.log( errorThrown );
          },
        });
        // clear tweet form
        $('#tweet-text').val('');
        // To Do display confirmation message that disappears on focus of textarea
        loadTweets();
      } else {
        alert('Your post is too long!');
      }
    } else {
      alert('Your post is empty!');
    }
  });

  const createTweetElement = (data) => {
    const { timeago } = window;
    const { user, content } = data;
    const timeAgo = timeago.format(data.created_at - 11 * 1000 * 60 * 60);
    const $tweet = $(`
      <article>
        <header>
          <div>
            <img src="${user.avatars}" />
            <span>${user.name}</span>
          </div>
          <span class="username">${user.handle}</span>
        </header>
        <p>${content.text}</p>
        <footer>
          <span>${timeAgo}</span>
          <div>
            <i class="fa-solid fa-flag fa-xs"></i>
            <i class="fa-solid fa-retweet fa-xs"></i>
            <i class="fa-solid fa-heart fa-xs"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  const renderTweets = (tweets) => {
    tweets.forEach((tweet) => {
      const tweetEl = createTweetElement(tweet);
      $('#tweet-feed').prepend(tweetEl);
    });
  };

  loadTweets();
});
