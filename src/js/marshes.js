var dot = require("./lib/dot");
var $ = require("jquery");
require('./lib/twitter');

$("#part4_link").addClass("active");

// setting up look up tables for mobile and desktop for clickable map
var lookup = {};
for (var i = 0, len = mapData.length; i < len; i++) {
    lookup[mapData[i].slug] = mapData[i];
}
var lookup_mobile = {};
for (var i = 0, len = mapData.length; i < len; i++) {
    lookup_mobile[mapData[i].id] = mapData[i];
}

// templates for the two interactives
var template = dot.compile(require("../partials/_lastmap_info.html"));
var mobile_template = dot.compile(require("../partials/_lastmap_mobile.html"));

// initialize map interactive on mobile
var index = 0;
document.querySelector(".mobile-template").innerHTML = mobile_template(lookup_mobile[index]);

// set up clicking to update map interactive on mobile
document.getElementById("scroll-right-lastmap").addEventListener("click", function() {
  index = index+1;
  console.log(lookup_mobile[index]);
  document.querySelector(".mobile-template").innerHTML = mobile_template(lookup_mobile[index]);
  if (index == 3) {
    $("#scroll-right-lastmap").addClass("last");
  } else {
    $("#scroll-right-lastmap").removeClass("last");
  };
  if (index == 0) {
    $("#scroll-left-lastmap").addClass("first");
  } else {
    $("#scroll-left-lastmap").removeClass("first");
  };
});

document.getElementById("scroll-left-lastmap").addEventListener("click", function() {
  index = index-1;
  console.log(lookup_mobile[index]);
  document.querySelector(".mobile-template").innerHTML = mobile_template(lookup_mobile[index]);
  if (index == 0) {
    $("#scroll-left-lastmap").addClass("first");
  } else {
    $("#scroll-left-lastmap").removeClass("first");
  };
  if (index == 3) {
    $("#scroll-right-lastmap").addClass("last");
  } else {
    $("#scroll-right-lastmap").removeClass("last");
  };
});

// clicking for desktop map interactive
var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));
qsa(".last-map-group").forEach(function(group) {
  group.addEventListener("click", function(e) {
    document.querySelector(".note").innerHTML = template(lookup[this.title]);
    if (document.querySelector(".selected")) document.querySelector(".selected").classList.remove("selected");
    e.target.parentElement.classList.add("selected");
  });
});

// -----------------------------------------------------------------------------
// expandable archival photo ---------------------------------------------------
// -----------------------------------------------------------------------------

var sidebar = document.getElementById("sidebar");
var sidebarlink = document.querySelector('#sidebar-link');

sidebarlink.addEventListener("click",function() {
  sidebar.style.display = "block";
  document.body.style.overflow = "hidden";
});

sidebar.addEventListener("click",function() {
  document.getElementById("sidebar").style.display = "none";
  document.body.style.overflow = "scroll";
});

// -----------------------------------------------------------------------------
// reload page if the reader re-orients their device ---------------------------
// -----------------------------------------------------------------------------

window.addEventListener("orientationchange", function() {
  window.location.reload();
}, false);
