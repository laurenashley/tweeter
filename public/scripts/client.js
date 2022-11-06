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

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: postText,
      success: function(data) {
        console.log(data);
      },
      error: function(data, textStatus, errorThrown) {
        console.log( errorThrown );
      },
      dataType: 'text',
    });
  });

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac",
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants",
      },
      "created_at": 1461116232227,
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd",
      },
      "content": {
        "text": "Je pense , donc je suis",
      },
      "created_at": 1461113959088,
    },
  ];

  const createTweetElement = (data) => {
    const { user, content, created_at } = data;
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

  const renderTweets = (tweets) => {
    tweets.forEach((tweet) => {
      const tweetEl = createTweetElement(tweet);
      $('#tweet-feed').append(tweetEl);
    });
  };

  renderTweets(data);
});
