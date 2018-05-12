// Transforms (rotates, flips, scales) mood selected using keyboard commands
var init_transform_commands_handler = function init_transform_commands_handler(){
  $('body').on('keydown', function (event) {

    var degrees, scale, flip;

    if ($('.selected').length === 0) {
      return;
    }

    var transform = getTransform($('.selected'));
    if (transform === null) {
      transform = { rotate: 0, scale: 1, scaleX: 1 };
      rotate = 0;
      scale = 1;
      flip = 1;
    }

    degrees = transform.rotate;
    scale = transform.scale;
    flip = transform.scaleX;

    switch (event.keyCode) {
      case 82:
        degrees = degrees === undefined || degrees === 315 ? 0 : degrees + 45;
        break;
      case 83:
        scale = scale === undefined || scale === 3 ? scale = 1 : scale + 0.5;
        break;
      case 70:
        flip = flip === undefined || flip === 1 ? -1 : 1;
        break;
    }
    $('.selected').css({ transform: 'rotate(' + degrees + 'deg)' + ' scale(' + scale + ',' + scale + ')' + ' scaleX(' + flip + ')' });
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
