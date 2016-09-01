require("component-responsive-frame/child");
require('image-slider');
var $ = require("jquery");

$("#part3_link").addClass("active");

// state propositions search bar
var thumbnailphoto = document.querySelector('#expandable-photo');
var bigphoto = document.querySelector('#expanded-photo');
var bodyvar = document.querySelector('body');

document.querySelector('#expandable-photo').addEventListener('click', function(){
  console.log("clicked on expandable");
  bigphoto.classList.add("expanded");
  bodyvar.classList.add("expanded");
});
document.querySelector('#expanded-photo').addEventListener('click', function(){
  bigphoto.classList.remove("expanded");
  bodyvar.classList.remove("expanded");
});

// populating map
[0,1,2,3].forEach(function(d,idx){
  var mapID = document.getElementById("development"+d);
  var results = mapData[d];
  var html = "<div class='map-title'>"+results.title+"</div><div class='map-hed'>What's there now: </div><div class='map-entry'>"+results.therenow+"</div><div class='map-hed'>What's planned: </div><div class='map-entry'>"+results.planned+"</div><div class='map-hed'>Protective measures: </div><div class='map-entry'>"+results.protective+"</div><div class='map-hed'>Timetable: </div><div class='map-entry'>"+results.timetable+"</div>";
  mapID.innerHTML = html;
  results = [];
});

if (screen.width > 480) {
  var mapImage = document.getElementById("ti-image")
  var mapHeight = 1535;//mapImage.getAttribute("height")+40;
  console.log(mapHeight);
//   // var mapHeight = 1200 + 40; //size of map + 40 pixels of padding
  // var textHeight = 0;
  var inc = mapHeight/4;
  console.log(inc); //how often we should see new map element
  // [0,1,2,3].forEach(function(d) {
  //   var loc_str = "#development"+d;
  //   textHeight = textHeight + document.getElementById(loc_str).getAttribute("height")+40; // each block has 40px padding
  //   console.log(textHeight);
  // });
  // textHeight = textHeight-20; // every block has 40px of padding except the bottom

  // var top_padding = Math.floor((mapHeight-textHeight)/7);
// //  console.log(top_padding);
//   if (top_padding < 0) {
// //    console.log("ERROR ERROR ERROR");
//     top_padding = 0;
//   }
//   embarcaderoData.forEach(function(pier,index) {
//     if (index > 0) {
//       var pier_str = ".pier"+index;
//       $(pier_str).css('padding-top',top_padding);
//     }
//   });
//
  $(window).scroll(function(){
      var pos = $(this).scrollTop();
      var shoreline_pos = $('#sticky-development-map-top').offset().top-200;
      if(pos < shoreline_pos) {
          document.getElementById('development0').classList.add("active");
      }
      if(pos > shoreline_pos) {
        var inc_list = [0,500,800,1000];
        [0,1,2,3].forEach(function(d,idx){
          var mapID = document.getElementById("development"+d);
          mapID.classList.remove("active");
        });
        var idx = Math.round((pos-shoreline_pos)/inc);
        console.log(idx);

        if (idx < 4 && idx >= 0) {
          var mapID = document.getElementById("development"+idx);
          mapID.classList.add("active");
          var inc_new = Math.round(inc_list[idx]);
          // var top_padding = (idx*inc+10)+"px";
          var top_padding = inc_new+"px";
          $("#development"+idx).css('padding-top',top_padding);
        }
        // $(".pier-info").css('color','#B2B2B2');
        // $('.st').css('fill','#F2F2F2');
        // var idx = Math.round((pos-embarcadero_pos)/inc);
        // var pier_active = ".pier"+idx;
        // var pier_path_active = ".st"+idx;
        // $(pier_active).css('color','black');
        // $(pier_path_active).css('fill', 'red');
      }
  });
}
