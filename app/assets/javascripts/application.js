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

  $(`.draggable`).on('mouseenter', function() {
    console.log('stuff is happening');
    $(this).css({'z-index': "999"});
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
