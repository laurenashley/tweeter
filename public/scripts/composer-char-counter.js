/* eslint-disable prefer-arrow-callback */
$(document).ready(function() {
  console.log('char counter script is running!');

  // eslint-disable-next-line space-before-blocks
  $('#tweet-text').keyup(function() {
    console.log($(this).val().length);
    const inputLength = $(this).val().length;
    const counter = $('output.counter');
    console.log(counter.val() - inputLength);
    // let newCounterVal = counter.val() - inputLength;
    counter.val(counter.val() - inputLength);
    // To Do if counter val < 0 turn number red
    if (counter.val() < 0) {
      counter.addClass('red-text');
    } else {
      counter.removeClass('red-text');
    }
  });
});