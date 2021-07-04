var log=document.querySelector(".logged");
var sign=document.querySelector(".signed");
var modal=document.querySelector(".modal-overlay");
var modal1=document.querySelector(".modal-overlay-1");
var close=document.querySelector(".login-btn");
var cloe=document.querySelector(".signup-btn");
log.addEventListener("click",function(){
  modal.classList.add("show");
});
close.addEventListener("click",function(){
  modal.classList.remove("show");
})
sign.addEventListener("click",function(){
  modal1.classList.add("show");
});
cloe.addEventListener("click",function(){
  modal1.classList.remove("show");
})




var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
// ---------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------------


    // var addborder=document.querySelector(".details");
    // var apply=addborder.querySelector(".about");
    // var final=apply.querySelector("#grocery");
    // addborder.addEventListener("mouseover",function(){
    //   final.classList.add("show-border");
    // });

const preloader = document.querySelector(".preloader");
window.addEventListener("load", function() {
    preloader.classList.add("hide-preloader");
});