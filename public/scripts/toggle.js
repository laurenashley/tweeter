/* eslint-disable prefer-arrow-callback */
$(document).ready(function() {
  // Toggle tweet form when cta clicked
  const tweetCTA = $('#toggle-form');
  const form = $('#tweet-form');

  tweetCTA.on('click', function() {
    form.slideDown('fast', function() {
      $(this).find('textarea#tweet-text').focus();
    });
  });
});
