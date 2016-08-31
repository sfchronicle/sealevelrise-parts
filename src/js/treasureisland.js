require("component-responsive-frame/child");
require('image-slider');

// state propositions search bar
var thumbnailphoto = document.querySelector('#expandable-photo');
var bigphoto = document.querySelector('#expanded-photo');
var bodyvar = document.querySelector('body');

document.querySelector('#expandable-photo').addEventListener('click', function(){
  console.log("clicked on expandable");
  bigphoto.classList.add("expanded");
  bodyvar.classList.add("expanded");
});
// document.querySelector('body').addEventListener('click', function(){
//   console.log("clicked on body");
//   console.log(e.target);
//   bigphoto.classList.remove("expanded");
//   bodyvar.classList.remove("expanded");
// });
document.querySelector('#expanded-photo').addEventListener('click', function(){
  bigphoto.classList.remove("expanded");
  bodyvar.classList.remove("expanded");
});
