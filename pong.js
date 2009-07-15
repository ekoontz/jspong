var x = 100;
var y = 100;

var increment_x = 3;
var increment_y = 1;

function setup() {
 setTimeout("move_ball()", 10);
}

function move_ball() {
  if ((x > 500) || (x < -50)) {
    increment_x = increment_x * -1;
  }

  if ((y > 150) || (y < -100)) {
    increment_y = increment_y * -1;
  }

  x = x + increment_x;
  y = y + increment_y;

  document.getElementById("show_x").innerHTML = x;
  document.getElementById("show_y").innerHTML = y;

  document.getElementById("ball").style.left = x+"px";
  document.getElementById("ball").style.top = y+"px";
  document.getElementById("ball").style.background = "yellow";

  setTimeout("move_ball()",10);


}
