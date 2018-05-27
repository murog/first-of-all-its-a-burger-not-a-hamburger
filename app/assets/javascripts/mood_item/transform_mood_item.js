// Transforms (rotates, flips, scales) mood selected using keyboard commands
var init_transform_commands_handler = function init_transform_commands_handler(){
  $('body').on('keydown', function (event) {

    var degrees, scale, flip;

    if ($('.selected').length === 0) {
      return;
    }

    var transform = getTransform($('.selected'));
    if (transform === null) {
      transform = { rotate: 0, scale: 0.25, scaleX: 1 };
      rotate = 0;
      scale = 0.25;
      flip = 1;
    }

    degrees = transform.rotate;
    scale = transform.scale;
    flip = transform.scaleX;

    var offset = $(".selected").offset();

    switch (event.keyCode) {
      case 82:
        degrees = degrees === undefined || degrees === 315 ? 0 : degrees + 45;
        break;
      case 83:
        scale = scale === undefined || scale === 1 ? scale = 0.25 : scale + 0.25;
        break;
      case 70:
        flip = flip === undefined || flip === 1 ? -1 : 1;
        break;
      case 37:
          // left
        $(".selected").offset({ top: offset.top, left: offset.left - 10});
        event.preventDefault();
        break;
      case 38:
        // up
        $(".selected").offset({ top: offset.top - 10, left: offset.left});
        event.preventDefault();
        break;
      case 39:
        // right
        $(".selected").offset({ top: offset.top, left: offset.left + 10});
        event.preventDefault();
        break;
      case 40:
        // down
        $(".selected").offset({ top: offset.top + 10, left: offset.left});
        event.preventDefault();
        break;
    }
    // tab
    if(event.keyCode === 9){
      // NOTE: COULD ALSO CYCLE THROUGH INSTEAD OF RANDOM WITH A GLOBAL VARIABLE
      $('.selected').removeClass('selected');
      const len = $('.draggable:not(:hidden)').length;
      const random = Math.floor( Math.random() * len ) + 1;
      $('.draggable:not(:hidden)').eq(random).addClass('selected');
    }else{
      $('.selected').css({ transform: 'rotate(' + degrees + 'deg)' + ' scale(' + scale + ',' + scale + ')' + ' scaleX(' + flip + ')' });
    }
  });
}


var getTransform = function getTransform(obj) {
  var property = obj.get(0).style.transform;

  if (property === '') {
    return null;
  }

  var regExp = /(?:\()[^\(\)]*?(?:\))/g;
  var matches = property.match(regExp);
  var rotate, scale, scaleX;

  matches.forEach(function (item) {
    var tempString = "";
    for (var i = 1; i < item.length; i++) {
      switch (item[i]) {
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
  return { rotate: rotate, scale: scale, scaleX: scaleX };
}
