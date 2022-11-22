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

  const showTweetForm = () => {
    form.slideDown('fast', function() {
      $(this).find('textarea#tweet-text').focus();
    });
  };

  // Toggle tweet form when cta clicked
  const tweetCTA = $('#toggle-form');
  const form = $('#tweet-form');

  tweetCTA.on('click', function() {
    showTweetForm();
  });

  // Show scroll up button on page scroll
  const scrollBtnMrkp = `<i class="scroll-cta fa-solid fa-angles-up" id="scroll-btn"></i>`;
  const textarea = $('textarea#tweet-text');

  $(window).scroll(function() {
    if(!$('#scroll-btn').length) {
      $(scrollBtnMrkp).appendTo($('body')).fadeIn('slow', function() {
        // listen for click, scroll to top of page when clicked
        const scrollBtn = $('#scroll-btn');
        scrollBtn.on('click', function() {
          window.scrollTo(0,0);
          showTweetForm();
        });
      });
    }
  });
});
