require("component-responsive-frame/child");
require('image-slider');
var $ = require("jquery");

$("#part3_link").addClass("active");

// state propositions search bar
var thumbnailphoto = document.querySelector('#expandable-photo');
var bigphoto = document.querySelector('#expanded-photo');
var bodyvar = document.querySelector('body');

// if (screen.width > 320) {
//   document.querySelector('#expandable-photo').addEventListener('click', function(){
//     bigphoto.classList.add("expanded");
//     bodyvar.classList.add("expanded");
//   });
//   document.querySelector('#expanded-photo').addEventListener('click', function(){
//     bigphoto.classList.remove("expanded");
//     bodyvar.classList.remove("expanded");
//   });
// }

var archive = document.getElementById("bigarchive");

thumbnailphoto.addEventListener("click",function() {
  archive.style.display = "block";
  document.body.style.overflow = "hidden";
});

// populating map
[0,1,2,3].forEach(function(d,idx){
  var mapID = document.getElementById("development"+d);
  var results = mapData[d];
  var html = "<div class='map-title'>"+results.title+"</div><div class='map-hed'>What's there now: </div><div class='map-entry'>"+results.therenow+"</div><div class='map-hed'>What's planned: </div><div class='map-entry'>"+results.planned+"</div><div class='map-hed'>Protective measures: </div><div class='map-entry'>"+results.protective+"</div><div class='map-hed'>Timetable: </div><div class='map-entry'>"+results.timetable+"</div>";
  mapID.innerHTML = html;
  results = [];
});

var mapHeight = $("#ti-image").height();
$(".flex-map").css("height",mapHeight+20+"px")

if (screen.width > 480) {
  var mapHeight = $("#ti-image").height();
  var inc = mapHeight/4;
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
          var inc_new = Math.round(inc_list[idx]*mapHeight/1535);
          // var top_padding = (idx*inc+10)+"px";
          var top_padding = inc_new+"px";
          $("#development"+idx).css('padding-top',top_padding);
        }
      }
  });
}
