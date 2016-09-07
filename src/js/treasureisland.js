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

(function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;

  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;

        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }

        window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                           ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}());

var overlay_images = ["cove_currentmean.png","cove_currentflood.png", "cove_2065mean.png","cove_2065flood.png","cove_2100mean.png","cove_2100flood.png"];

var overlay = document.getElementById('cranecove-overlay');
var elem = document.createElement("img");
overlay.appendChild(elem);
console.log("added the image");
var i = 0;

var loop = null;
var tick = function() {
  console.log("here we are ticking");
  // bubblechart_slope(groups[i]);
  // updateInfo(groups[i]);
  overlay.src = "../assets/graphics/part3/cranecove/"+overlay_images[i];
  console.log(overlay.src);
  i = (i + 1) % overlay_images.length;
  loop = setTimeout(tick, i == 0 ? 1700 : 1000);
};

tick();

setTimeout( function(){
    // Do something after 1 second
    // $(".start").removeClass("selected");
    // $(".pause").addClass("selected");
    looping = false;
    clearTimeout(loop);
  }  , 60000 );
