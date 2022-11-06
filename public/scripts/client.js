/* eslint-disable quotes */
/* eslint-disable quote-props */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// eslint-disable-next-line prefer-arrow-callback
$(document).ready(function() {
  // eslint-disable-next-line prefer-arrow-callback
  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const postText = $(this).serialize();
    if (postText) {
      if ($(this).length <= 140) {
        $.ajax({
          type: 'POST',
          url: '/tweets',
          data: postText,
          success: function(data) {},
          error: function(data, textStatus, errorThrown) {
            console.log( errorThrown );
          },
          dataType: 'text',
        });
      } else {
        alert('Your post is too long!');
      }
    } else {
      alert('Your post is empty!');
    }
  });

  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(res) {
        renderTweets(res);
      }
    });
  };

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
      $('#tweet-feed').append(tweetEl);
    });
  };

  loadTweets();
});
