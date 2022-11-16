/* eslint-disable prefer-arrow-callback */
$(document).ready(function() {
  const initCount = $('output.counter').val();

  $('#tweet-text').on('input', function() {
    const inputLength = $(this).val().length;
    const counter = $('output.counter');
    counter.val(initCount - inputLength);
    // make text red when input is over the limit
    counter[counter.val() < 0 ? 'addClass' : 'removeClass']('red-text');
  });
});