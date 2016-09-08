require("component-responsive-frame/child");
require('image-slider');
var $ = require("jquery");
require('./lib/twitter');

$("#part3_link").addClass("active");

// // state propositions search bar
// var thumbnailphoto = document.querySelector('#expandable-photo');
// var bigphoto = document.querySelector('#expanded-photo');
// var bodyvar = document.querySelector('body');

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

// -----------------------------------------------------------------------------
// expandable archival photo ---------------------------------------------------
// -----------------------------------------------------------------------------

var archive = document.getElementById("bigarchive");
var thumbnailphoto = document.querySelector('#expandable-photo');

thumbnailphoto.addEventListener("click",function() {
  if (document.body.clientWidth > 768) {
    archive.style.display = "block";
    document.body.style.overflow = "hidden";
  }
});

// -----------------------------------------------------------------------------
// interactive map showing developments ----------------------------------------
// -----------------------------------------------------------------------------

// populating map
[0,1,2,3].forEach(function(d,idx){
  var mapID = document.getElementById("development"+d);
  var results = mapData[d];
  var html = "<div class='map-image'><img class='img' src='"+results.img+"'></img></div><div class='map-title'>"+results.title+"</div><div class='map-hed'>What's there now: </div><div class='map-entry'>"+results.therenow+"</div><div class='map-hed'>What's planned: </div><div class='map-entry'>"+results.planned+"</div><div class='map-hed'>Protective measures: </div><div class='map-entry'>"+results.protective+"</div><div class='map-hed'>Timetable: </div><div class='map-entry'>"+results.timetable+"</div>";
  mapID.innerHTML = html;
  results = [];
});

function fill_mobile_template(results,mobileID){
  var html = "<div class='map-image'><img class='img' src='"+results.img+"'></img></div><img class='inset-img' src='"+results.insetimg+"'></img><div class='map-title'>"+results.title+"</div><div class='map-hed'>What's there now: </div><div class='map-entry'>"+results.therenow+"</div><div class='map-hed'>What's planned: </div><div class='map-entry'>"+results.planned+"</div><div class='map-hed'>Protective measures: </div><div class='map-entry'>"+results.protective+"</div><div class='map-hed'>Timetable: </div><div class='map-entry'>"+results.timetable+"</div>";
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

if (screen.width > 480) {

  var inc = mapHeight/5;
  var inc_list = [0, inc-offset, inc*2-offset, inc*3-offset];
  $(window).scroll(function(){
      var pos = $(this).scrollTop();
      var shoreline_pos = $('#sticky-development-map-top').offset().top-200;
      if(pos < shoreline_pos) {
          $('#development0').addClass("active");
      }
      if(pos > shoreline_pos) {
        [0,1,2,3].forEach(function(d,idx){
          $("#development"+d).removeClass("active");
        });
        var idx = Math.round((pos-shoreline_pos)/inc);

        if (idx < 4 && idx >= 0) {
          $("#development"+idx).addClass("active");
          var inc_new = inc_list[idx];
          var top_padding = inc_new+"px";
          $("#development"+idx).css('padding-top',top_padding);
        } else {
          var inc_new = inc_list[3];
          var top_padding = inc_new+"px";
          $("#development3").css('padding-top',top_padding);
          $('#development3').addClass("active");
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

// -----------------------------------------------------------------------------
// crane cove flood animation --------------------------------------------------
// -----------------------------------------------------------------------------

var hightide_images = ["cove_currentmean.png", "cove_2065mean.png","cove_2100mean.png"];
var flood_images = ["cove_currentflood.png", "cove_2065flood.png","cove_2100flood.png"];

var overlay = document.getElementById('cranecove-overlay');
var elem = document.createElement("img");
overlay.appendChild(elem);
var i = 0;
var looping = true;
var overlay_images = hightide_images;

var loop = null;
var tick = function() {
  overlay.src = "../assets/graphics/part3/cranecove/"+overlay_images[i];
  i = (i + 1) % overlay_images.length;
  loop = setTimeout(tick, i == 0 ? 1700 : 1000);
};

tick();

$(".start").click(function() {
  if (looping) { return }
  $(".start").addClass("selected");
  $(".pause").removeClass("selected");
  looping = true;
  var i = 0;
  tick();
})

$(".pause").click(function() {
  if (!looping) { return }
  $(".start").removeClass("selected");
  $(".pause").addClass("selected");
  looping = false;
  clearTimeout(loop);
})

setTimeout( function(){
  console.log("timed out");
  looping = false;
  clearTimeout(loop);
}  , 60000 );

$("#hightide").click(function(){
  $("#hightide").addClass("selected");
  $("#flood").removeClass("selected");
  overlay_images = null;
  clearTimeout(loop);
  looping = false;
  overlay_images = hightide_images;
  i = 0;
  looping = true;
  $(".start").addClass("selected");
  $(".pause").removeClass("selected");
  tick();
});

$("#flood").click(function(){
  $("#flood").addClass("selected");
  $("#hightide").removeClass("selected");
  overlay_images = null;
  clearTimeout(loop);
  looping = false;
  overlay_images = flood_images;
  i = 0;
  looping = true;
  $(".start").addClass("selected");
  $(".pause").removeClass("selected");
  tick();
});

// -----------------------------------------------------------------------------
// reload page if the reader re-orients their device ---------------------------
// -----------------------------------------------------------------------------

window.addEventListener("orientationchange", function() {
  window.location.reload();
}, false);
