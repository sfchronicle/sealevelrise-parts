var dot = require("./lib/dot");
var $ = require("jquery");
require('./lib/twitter');
require('image-slider');

$("#part4_link").addClass("active");

// templates for the two interactives
var slideshow_template = dot.compile(require("../partials/_slideshow.html"));

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
document.querySelector(".note").innerHTML = template(lookup["ravenswood"]);
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
// photo gallery 6 ---------------------------
// -----------------------------------------------------------------------------

// initialize photo gallery #6
var photo1 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11813276/3/2000x1000.jpg",
  caption: "A jet takes off over the original levees that surround Oakland International Airport, which opened in 1962. With as little as 18 inches of sea level rise, water could spill across Doolittle Drive onto the airport runways several times a year during extra-high tides unless the drive’s low spots are raised. ",
  credit: "Michael Macor"
};
var photo2 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11813273/3/2000x1000.jpg",
  caption: "Some ponds are a lot more saturated with salt than others at the Ravenswood Ponds in East Palo Alto. Ravenswood is one of the South Bay Salt Pond Restoration projects. ",
  credit: "Michael Macor"
};
var photo3 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11813274/3/2000x1000.jpg",
  caption: "Remnants of the old salt works from the 1920s remain at the Eden Landing Ecological Reserve in Hayward. Eden Landing is one of the South Bay Salt Pond Restoration projects. ",
  credit: "Michael Macor"
};
var photo4 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11813277/3/2000x1000.jpg",
  caption: "An estimated 9,000 properties in Foster City are protected by a levee that runs around the entire development. City officials are considering their options after the Federal Emergency Management Agency’s pending coastal flood map indicates that Foster City’s levee system is no longer adequate. ",
  credit: "Michael Macor"
};
var photo5 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11813236/3/2000x1000.jpg",
  caption: "Brian Gilardi operates a spreader filled with lime that is distributed along the levees at the Sears Point Wetland Restoration in Sonoma. The lime is used to balance the acidity of the soil, which will encourage plant growth. ",
  credit: "Michael Macor"
};
document.querySelector("#photo_g60").innerHTML = slideshow_template(photo1);
document.querySelector("#photo_g61").innerHTML = slideshow_template(photo2);
document.querySelector("#photo_g62").innerHTML = slideshow_template(photo3);
document.querySelector("#photo_g63").innerHTML = slideshow_template(photo4);
document.querySelector("#photo_g64").innerHTML = slideshow_template(photo5);

// photo gallery #4
var gallery6_idx = 0;
// set up clicking to update map interactive on mobile
document.getElementById("scroll-right-gallery6").addEventListener("click", function() {
  gallery6_idx = gallery6_idx+1;
  $(".photo_g6").removeClass("active");
  $("#photo_g6"+gallery6_idx).addClass("active");
  if (gallery6_idx == 4) {
    $("#scroll-right-gallery6").addClass("last");
  } else {
    $("#scroll-right-gallery6").removeClass("last");
  };
  if (gallery6_idx == 0) {
    $("#scroll-left-gallery6").addClass("first");
  } else {
    $("#scroll-left-gallery6").removeClass("first");
  };
});
document.getElementById("scroll-left-gallery6").addEventListener("click", function() {
  gallery6_idx = gallery6_idx-1;
  $(".photo_g6").removeClass("active");
  $("#photo_g6"+gallery6_idx).addClass("active");
  if (gallery6_idx == 4) {
    $("#scroll-right-gallery6").addClass("last");
  } else {
    $("#scroll-right-gallery6").removeClass("last");
  };
  if (gallery6_idx == 0) {
    $("#scroll-left-gallery6").addClass("first");
  } else {
    $("#scroll-left-gallery6").removeClass("first");
  };
});

// -----------------------------------------------------------------------------
// reload page if the reader re-orients their device ---------------------------
// -----------------------------------------------------------------------------

window.addEventListener("orientationchange", function() {
  window.location.reload();
}, false);
