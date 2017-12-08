/* eslint-disable */

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery-ui
//= require rails-ujs
//= require turbolinks
//= require_tree .

function getTransform(obj) {
  let property = (obj.get(0).style.transform);

  if(property === ''){
    return null;
  }

  var regExp = /(?:\()[^\(\)]*?(?:\))/g;
  var matches = (property).match(regExp);
  var rotate, scale, scaleX;

  matches.forEach(function(item){
    var tempString = "";
    for(var i = 1; i < item.length; i++){
      switch(item[i]){
        case 'd':
          rotate = parseInt(tempString);
          break;
        case ')':
          scaleX = parseInt(tempString);
          break;
        case ',':
          scale = parseFloat(tempString);
          break;
        default:
          tempString += item[i];
          break;
      }
    }
  });
  return({rotate: rotate, scale: scale, scaleX: scaleX});
}

var ready = function ready() {

  $('.draggable').click(function(e){
    $('.draggable').removeClass('selected');
    $(this).addClass('selected');
  });

  $('body').on('keydown', function(event) {
    var degrees, scale, flip;
    var transform = getTransform($('.selected'));
    if(transform === null){
      transform = { rotate: 0, scale: 1, scaleX: 1 };
      rotate = 0;
      scale = 1;
      flip = 1;
    }

    degrees = transform.rotate;
    scale = transform.scale;
    flip = transform.scaleX;

    switch(event.keyCode){
      case 82:
        degrees = ( degrees === undefined || degrees === 315) ? 0 : degrees + 45;
        break;
      case 83:
        scale = (scale === undefined || scale === 3) ? scale = 1 : scale + 0.5;
        break;
      case 70:
        flip = (flip === undefined || flip === 1) ? -1 : 1;
        break;
    }
    $('.selected').css({ transform: 'rotate(' + degrees + 'deg)' + ' scale(' + scale + ',' + scale + ')' + ' scaleX(' + flip + ')' });
  });

  // create side menu events
  $('#save').click( function() {
    console.log($('#mood_form').offset().top);
    $('html').animate({
      scrollTop: $('#mood_form').offset().top
    }, 500);
  });

  $('#tutorial').click( function(event) {
    createTooltip(event);
  }).mouseout(function() {
    $('.tooltip').css({'display': 'none'});
  });

  function createTooltip(event) {
    $('.tooltip').css({'display': 'block'});
    positionTooltip(event);
  };

  function positionTooltip(event){
    $('div.tooltip').css({'position': 'absolute', 'top': '200px', 'right': '70px'});
  };

// $(document).ready(function () {
  $(document).empty();

  $(function () {
    $(".draggable").draggable();
    $('.prompt').draggable();
  });
  var setZIndexByArrayIndex = function setZIndexByArrayIndex(array) {
    for (var _i = 0; _i < array.length; _i++) {
      $(array[_i]).css({ 'z-index': '' + _i });
    }
  };
  // creates a real array for draggables
  var dragArray = [];
  for (var _i2 = 0; _i2 < $('.draggable').length; _i2++) {
    dragElement = $(".draggable")[_i2];
    dragArray.push(dragElement);
    setZIndexByArrayIndex(dragArray);
  };

  collectPositions();

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

  $('body').on('submit', '#mood_form', function (e) {
    e.preventDefault();
    var moodName = document.getElementById('mood_name').value;
    var moodDescription = document.getElementById('mood_description').value;
    var moodItems = collectPositions();
    var promptId = $('.prompt')[0].id
    var trueData = { items: {}, name: moodName, description: moodDescription, prompt_id: promptId };
    for (i = 0; i < moodItems.length; i++) {
      trueData['items']['item' + i] = {
        item_name: moodItems[i].alt,
        left_coord: moodItems[i].left,
        top_coord: moodItems[i].top,
        z_index: moodItems[i].zStuff
      };
    };

    var url = '/moods';
    var data = { msg: 'wow' };
    $.ajax({
      type: "POST",
      url: '/moods',
      data: trueData
    });
  });
};

var collectPositions = function collectPositions() {
  var mood = $('#mood-container');
  mood.top = 100;
  mood.bottom = 530;
  mood.left = 0;
  mood.right = 430;
  var draggables = $('.draggable');
  var moodItems = [];
  for (i = 0; i < draggables.length; i++) {
    var item = draggables[i];
    item.left = item.style.left;
    var leftEnd = item.left.length - 2;
    item.left = parseFloat(item.left.substring(0, leftEnd));
    item.top = item.style.top;
    var topEnd = item.top.length - 2;
    item.top = parseFloat(item.top.substring(0, topEnd));
    item.zStuff = parseFloat(item.style.zIndex);
    if (item.top <= mood.bottom && item.top >= mood.top && item.left <= mood.right) {
      moodItems.push(draggables[i]);
    }
  }
  // console.log('there are ' + moodItems.length + ' items in the container');
  // console.log(moodItems);
  return moodItems;
};

var saveMood = function saveMood() {
  var moodItems = collectPositions();
  var url = '/moods';
  var data = { msg: 'wow' };
  $.ajax({
    type: "POST",
    url: '/moods',
    data: data
  });
};

$(document).on('turbolinks:load', ready);
