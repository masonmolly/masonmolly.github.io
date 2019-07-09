//Script modified from https://www.w3schools.com/w3css/w3css_slideshow.asp
var slideIndex = 1;
showDivs(slideIndex); //calls function to display first element (on page load)

function plusDivs(n) { //function is called when slideshow buttons are pressed
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slideshow-img"); //array of all slideshow images
  var z = document.getElementsByClassName("slideshow-caption");
  if (n > x.length) 
	{
		slideIndex = 1
	} 
  if (n < 1) 
	{
	  slideIndex = x.length
	} 
  for (i = 0; i < x.length; i++) 
	{	
		x[i].style.display = "none";
		z[i].style.display = "none";				
	}
  x[slideIndex-1].style.display = "block"; 
  z[slideIndex-1].style.display = "block";  
}