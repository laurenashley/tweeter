$(document).ready(function() {
  console.log('char counter script is running!');
  $('#tweet-text').on('input', function(){
    console.log('this ', $(this).val().length);
    const inputLength = $(this).val().length;
    const counter = $('output.counter'); // To Do find another more specific selector
    // To Do if backspace + 1
    // To Do if counter val < 0 turn number red 
    counter.val(counter.val() - 1);
  });
});