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

$(document).ready(function() {
  $(function() {
    $(".draggable").draggable();
  });
  const setZIndexByArrayIndex = function setZIndexByArrayIndex(array) {
    for(let i = 0; i < array.length; i++) {
      $(array[i]).css({'z-index': `${i}`});
    }
  };
  // creates a real array for draggables
  const dragArray = [];
  for(let i = 0; i < $('.draggable').length ; i++){
  // $(".draggable").forEach((dragElement) => {
      dragElement = $(".draggable")[i];
      dragArray.push(dragElement);
      // dragElement.css({'z-index': `${i}`});
      setZIndexByArrayIndex(dragArray);
  };



  $(`.draggable`).on('click', function() {
    // look for it in dragArray
    const current = this;
    for(let i = 0; i< dragArray.length; i++ ){
      if (dragArray[i] === current) {
        const splicedIt = dragArray.splice(i, 1);
        dragArray.push(splicedIt[0]);
        console.log(dragArray);
        setZIndexByArrayIndex(dragArray)
      }
    };
    // pop* it out of the dragArray
    // push* it back to the end
    // *has to update all the z-indexes as your popping and pushing

    // let draggables = $('.draggable');
    // console.log(draggables)

    // console.log('stuff is happening');
    // $(this).css({'z-index': "999"});

    // const max = draggables.length;
    // for(let i = 0; i < draggables.length; i++) {
    //   console.log('hey');
    //   if (draggables[i] !== this) {
    //   $(draggables[i]).css({'z-index': `${max-i}`});
    //   }
    // };
  });
});






// $(function zIndex() {
//     let draggables = $(".draggable");
//     draggables.mouseenter(function() {
//         var el = $(this);
//             max = 0;
//         draggables.each(function() {
//             var z = parseInt( $( this ).css("z-index"), 10);
//             max = Math.max(max, z);
//         });
//         el.css("z-index", max + 1);
//     });
//   })
