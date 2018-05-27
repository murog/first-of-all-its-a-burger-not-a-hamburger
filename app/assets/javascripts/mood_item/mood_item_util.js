// There were a lot of listners to events being set in application.js
// Most listeners were there to make sure each mood had the correct classes
// Put them all here so application.js is less cluttered
var init_mood_item_util = function init_mood_item_util(){
  // sets clicked item as selected item
  $('.draggable').click(function (e) {
    $('.draggable').removeClass('selected');
    $(this).addClass('selected');
  });

  // makes sure the form doesn't count as a "selected mood_item"
  $('#mood_form').click(function (e) {
    $('.selected').removeClass('selected');
  });

  // creates an array for draggables
  var dragArray = [];
  for (var _i2 = 0; _i2 < $('.draggable').length; _i2++) {
    dragElement = $(".draggable")[_i2];
    dragArray.push(dragElement);
    setZIndexByArrayIndex(dragArray);
  };

  // sets the selected mood_item at the top in the mood_item order
  $('.draggable').on('click', function () {
    // look for it in dragArray
    var current = this;
    for (var _i3 = 0; _i3 < dragArray.length; _i3++) {
      if (dragArray[_i3] === current) {
        var splicedIt = dragArray.splice(_i3, 1);
        dragArray.push(splicedIt[0]);
        setZIndexByArrayIndex(dragArray);
      }
    };
    collectPositions();
  });

  // If it's being dragged, it's the new selected mood_item now
  // IDR - are click and drag events supposed to be differently handled?
  $('.draggable').on('drag', function() {
    if(!$(this).hasClass('selected')){
      $('.draggable').removeClass('selected');
      $(this).addClass('selected');
    }
  });
}

// sets the z-index of the mood_items
var setZIndexByArrayIndex = function setZIndexByArrayIndex(array) {
  for (var _i = 0; _i < array.length; _i++) {
    $(array[_i]).css({ 'z-index': '' + _i });
  }
};

//  Collects the positions of the mood_items in the mood_container (pink box thing)
//  GM- consider renaming function to collectAttributes?
var collectPositions = function collectPositions() {
  var mood = $('#mood-container');
  mood.top = mood.offset().top;
  mood.bottom = mood.top + mood.height();
  mood.left = mood.offset().left;
  mood.right = mood.left + mood.width();

  // GM - refers to items with draggable class
  var draggables = $('.draggable');
  var moodItems = [];

  for (i = 0; i < draggables.length; i++) {
    var item = draggables[i];
    if(isOverlap($(item),mood)){
      item.left = $(item).offset().left - mood.left;
      item.top = $(item).offset().top - mood.top;
      item.zStuff = parseFloat(item.style.zIndex);
      item.transform = item.style.transform;
      console.log("########");
      console.log(item.left);
      console.log(item.top);
      moodItems.push(item);
    }

  }
  // console.log('there are ' + moodItems.length + ' items in the container');
  // console.log(moodItems);
  return moodItems;
};

function isOverlap(item,mood){

  var offsetItem = item.offset(),
  offsetMood = mood.offset(),
  topItem = offsetItem.top,
  topMood = offsetMood.top,
  leftItem = offsetItem.left,
  leftMood = offsetMood.left,
  rightItem = leftItem + item.width(),
  rightMood = leftMood + mood.width(),
  bottomItem = topItem + item.height(),
  bottomMood = topMood + mood.height();

  return !(leftMood > rightItem || rightMood < leftItem || topMood > bottomItem || bottomMood < topItem);
}
