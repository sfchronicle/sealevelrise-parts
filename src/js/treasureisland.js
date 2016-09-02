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
  var html = "<div class='map-image'><img class='img' src='"+results.img+"'></img></div><div class='map-title'>"+results.title+"</div><div class='map-hed'>What's there now: </div><div class='map-entry'>"+results.therenow+"</div><div class='map-hed'>What's planned: </div><div class='map-entry'>"+results.planned+"</div><div class='map-hed'>Protective measures: </div><div class='map-entry'>"+results.protective+"</div><div class='map-hed'>Timetable: </div><div class='map-entry'>"+results.timetable+"</div>";
  mapID.innerHTML = html;
  results = [];
});

function fill_mobile_template(results,mobileID){
  var html = "<div class='map-image'><img class='img' src='"+results.img+"'></img></div><div class='map-title'>"+results.title+"</div><div class='map-hed'>What's there now: </div><div class='map-entry'>"+results.therenow+"</div><div class='map-hed'>What's planned: </div><div class='map-entry'>"+results.planned+"</div><div class='map-hed'>Protective measures: </div><div class='map-entry'>"+results.protective+"</div><div class='map-hed'>Timetable: </div><div class='map-entry'>"+results.timetable+"</div>";
  mobileID.innerHTML = html;
}

if (screen.width < 700) {
  var mapHeight = 1200;
  var offset = 120;
} else if (screen.width < 800) {
  var mapHeight = 1100;
  var offset = 50;
} else if (screen.width < 1100) {
  var mapHeight = 1300;
  var offset = 110;
} else {
  var mapHeight = 1400;
  var offset = 150;
}

// if (screen.width < 768){
//   var inc_list = [0,200,400,500];
// } else {
//   var inc_list = [0,250,450,650];
// }

// $(window).load(function(){
//   var mapHeight = $("#tiimage").height();
//   console.log("we are setting the interactive height to be:");
//   console.log(mapHeight);
//   $(".flex-map").css("height",mapHeight+40+"px")
// });

if (screen.width > 480) {

  var inc = mapHeight/5;
  // var offset = 100;
  var inc_list = [0, inc-offset, inc*2-offset, inc*3-offset];
  console.log(inc_list);
  $(window).scroll(function(){
      var pos = $(this).scrollTop();
      var shoreline_pos = $('#sticky-development-map-top').offset().top-200;
      if(pos < shoreline_pos) {
          document.getElementById('development0').classList.add("active");
      }
      if(pos > shoreline_pos) {
        [0,1,2,3].forEach(function(d,idx){
          var mapID = document.getElementById("development"+d);
          mapID.classList.remove("active");
        });
        var idx = Math.round((pos-shoreline_pos)/inc);

        if (idx < 4 && idx >= 0) {
          var mapID = document.getElementById("development"+idx);
          mapID.classList.add("active");
          var inc_new = inc_list[idx];
          // var inc_new = Math.round(inc_list[idx]*mapHeight/1535);
          var top_padding = inc_new+"px";
          $("#development"+idx).css('padding-top',top_padding);
        } else {
          var inc_new = inc_list[3];
          // var inc_new = Math.round(inc_list[3]*mapHeight/1535);
          var top_padding = inc_new+"px";
          $("#development3").css('padding-top',top_padding);
          document.getElementById('development3').classList.add("active");
        }
      }
  });
} else {
  // initialize map interactive on mobile
  var index = 0;
  var mobileID = document.getElementById("mobile-development");
  var results = mapData[index];
  fill_mobile_template(results,mobileID);
  // set up clicking to update map interactive on mobile
  document.getElementById("scroll-right-dev").addEventListener("click", function() {
    index = index+1;
    var results = mapData[index];
    fill_mobile_template(results,mobileID)
    if (index == 3) {
      $("#scroll-right-dev").addClass("last");
    } else {
      $("#scroll-right-dev").removeClass("last");
    };
    if (index == 0) {
      $("#scroll-left-dev").addClass("first");
    } else {
      $("#scroll-left-dev").removeClass("first");
    };
  });

  document.getElementById("scroll-left-dev").addEventListener("click", function() {
    index = index-1;
    var results = mapData[index];
    fill_mobile_template(results,mobileID)
    if (index == 0) {
      $("#scroll-left-dev").addClass("first");
    } else {
      $("#scroll-left-dev").removeClass("first");
    };
    if (index == 3) {
      $("#scroll-right-dev").addClass("last");
    } else {
      $("#scroll-right-dev").removeClass("last");
    };
  });
}
