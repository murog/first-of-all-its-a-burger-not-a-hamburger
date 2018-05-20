// Makes a POST request with the positions of the mood_items
function saveMood() {
  var moodItems = collectPositions();
  var url = '/moods';
  var data = { msg: 'wow' };
  $.ajax({
    type: "POST",
    url: '/moods',
    data: data
  });
};

var init_background_buttons = function init_background_buttons(){
  $('.background-button').click(function (event) {
      var color = $(this).css('backgroundColor');
      $('#mood-container').css('backgroundColor', color);
  });
}

// Initializes event handler for when user presses submit
var init_submit_form = function init_submit_form(){
  // Submits the mood form
    $('body').on('submit', '#mood_form', function (e) {
      e.preventDefault();
      var moodName = document.getElementById('mood_name').value;
      var moodDescription = document.getElementById('mood_description').value;
      var moodItems = collectPositions();
      var promptId = $('.prompt')[0].id;
      var backgroundColor = $('#mood-container').css('backgroundColor');
      var trueData = { items: {}, name: moodName, description: moodDescription, prompt_id: promptId, background: backgroundColor };
      for (i = 0; i < moodItems.length; i++) {
        trueData['items']['item' + i] = {
          item_name: moodItems[i].alt,
          left_coord: moodItems[i].left,
          top_coord: moodItems[i].top,
          z_index: moodItems[i].zStuff,
          transform: moodItems[i].transform
        };
      };

      $.ajax({
        type: "POST",
        url: '/moods',
        data: trueData
      });
    });
}
