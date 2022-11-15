/* eslint-disable prefer-arrow-callback */
$(document).ready(function() {
  const initCount = $('output.counter').val();

  // eslint-disable-next-line space-before-blocks
  // To Do use submit event instead of keyup?
  $('#tweet-text').keyup(function() {
    const inputLength = $(this).val().length;
    const counter = $('output.counter');
    counter.val(initCount - inputLength);
    // make text red when input is over the limit
    counter[counter.val() < 0 ? 'addClass' : 'removeClass']('red-text');
  });
});