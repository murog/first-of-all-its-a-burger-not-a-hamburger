// Create Side-menu event handlers & listeners
var init_sidemenu = function init_sidemenu(){
  $('#save').click(function () {
    console.log($('#mood_form').offset().top);
    $('html').animate({
      scrollTop: $('#mood_form').offset().top
    }, 500);
  });

  $('#tutorial').click(function (event) {
    createTooltip(event);
  }).mouseout(function () {
    $('.tooltip').css({ 'display': 'none' });
  });

  function createTooltip(event) {
    $('.tooltip').css({ 'display': 'block' });
    positionTooltip(event);
  };

  function positionTooltip(event) {
    $('div.tooltip').css({ 'position': 'absolute', 'top': '200px', 'right': '70px' });
  };

  $(document).empty();

  $(function () {
    $(".draggable").draggable();
    $(".draggable").first().addClass("selected");
    $('.prompt').draggable();

    $( "#trashCover" ).droppable({
      drop: function( event, ui ) {
        // Maybe make hidden again?
        $('.selected').remove();

        var otherItems = $('.hidden').first();
        otherItems.removeClass('hidden').addClass('draggable');
      }
    });
  });
}
