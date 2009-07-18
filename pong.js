
function setup() {
    document.getElementById("ball1").style.left = "100px";
    document.getElementById("ball1").style.top  = "200px";

    document.getElementById("ball2").style.left = "150px";
    document.getElementById("ball2").style.top  = "50px";

    var increment_x_1 = 3;
    var increment_y_1 = 1;

    setTimeout("move_ball('ball1',"+increment_x_1+","+increment_y_1+")", 10);

    var increment_x_2 = 1;
    var increment_y_2 = 3;


    setTimeout("move_ball('ball2',"+increment_x_2+","+increment_y_2+")", 10);

}

function move_ball(ball_id,increment_x,increment_y) {
    var x = document.getElementById(ball_id).style.left;
    var y = document.getElementById(ball_id).style.top;

    x = new Number(x.replace(/px/gi, ""));
    y = new Number(y.replace(/px/gi, ""));
 
    if ((x > 290) || (x < 0)) {
	increment_x = increment_x * -1;
    }
    
    if ((y > 390) || (y < 0)) {
	increment_y = increment_y * -1;
    }
    
    x = x + increment_x;
    y = y + increment_y;
 
/*    document.getElementById("show_x").innerHTML = increment_x;
    document.getElementById("show_y").innerHTML = increment_y;*/

    document.getElementById(ball_id).style.left = x+"px";
    document.getElementById(ball_id).style.top = y+"px";

    setTimeout("move_ball('"+ball_id+"',"+increment_x+","+increment_y+")", 10);

}
