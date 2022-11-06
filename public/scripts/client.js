/* eslint-disable quote-props */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// eslint-disable-next-line prefer-arrow-callback
$(document).ready(function() {
  const createTweetElement = (tweetData) => {
    const { user } = tweetData;
    const { content } = tweetData;
    const { created_at } = tweetData;
    const $tweet = $(`
      <article>
        <header>
          <span><img src="${user.avatar}" />${user.name}</span>
          <span class="username">${user.handle}</span>
        </header>
        <p>${content.text}</p>
        <footer>
          <span>${created_at} ago</span>
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

  const tweetData = {
    'user': {
      'name': 'Newton',
      'avatar': 'https://i.imgur.com/73hZDYK.png',
      'handle': '@SirIsaac',
    },
    'content': {
      'text': 'If I have seen further it is by standing on the shoulders of giants',
    },
    'created_at': 1461116232227,
  };

  const $tweet = (createTweetElement(tweetData));

  console.log($tweet);

  $('#tweet-feed').prepend($tweet);
});
