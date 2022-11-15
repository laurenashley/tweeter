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

  const handleErrorElement = () => {
    // remove error when user edits tweet text
    $('#submit-tweet').submit(() => {
      $('#tweet-error').remove();
    });
  };

  const createErrorElement = (errorMsg) => {
    const $error = $(`
      <p id="tweet-error" class="error">
        <i class="fa-solid fa-triangle-exclamation"></i>
        ${errorMsg}
      </p>
    `);
    handleErrorElement();
    return $error;
  };

  // get character limit for tweet post
  const count = Number($('#counter').val());

  // helper to make user inputted text safer
  const escape = (str) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const resetTweetForm = ()=> {
    // clear tweet form
    $('#tweet-text').val('');
    // reset counter
    $('output.counter').val(count);
  };

  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const userInput = $('#tweet-text').val();
    const safeText = escape(userInput);

    // replace user input with safe text
    $('#tweet-text').val(safeText);

    if ($(this).serialize() !== 'text=') {
      const currCount = Number($('#counter').val());
      if (currCount <= count && currCount >= 0) {
        $.ajax({
          type: 'POST',
          url: '/tweets',
          data: $(this).serialize(),
          success: function(data) {},
          error: function(data, textStatus, errorThrown) {
            console.log( errorThrown );
          },
        });

        resetTweetForm();

        // To Do display confirmation message that disappears on focus of textarea
        loadTweets();
      } else {
        const errorEl = createErrorElement('Your post is too long! Reduce your message to 140 characters or less.');
        $('#submit-tweet').prepend(errorEl);
      }
    } else {
      const errorEl = createErrorElement('Your post empty! Please write a message to tweet and try again.');
      $('#submit-tweet').prepend(errorEl);
    }
  });
});
