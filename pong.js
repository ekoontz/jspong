var arena_height = 400;
var arena_width = 600;

var paddle_height = 75;

function setup() {

    document.getElementById("arena").style.height = arena_height+"px";
    document.getElementById("arena").style.width = arena_width+"px";
    document.getElementById("playfield").style.height = arena_width+"px";
    document.getElementById("right_paddle_area").style.left = (arena_width-50)+"px";

    document.getElementById("paddleleft").style.height = paddle_height+"px";
    document.getElementById("paddleright").style.height = paddle_height+"px";



    document.getElementById("paddleleft").onmousedown =
	function() { grab_paddle(this);}
    document.getElementById("paddleleft").onmouseup =
	function() { drop_paddle(this);}

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

var clicked_obj = null;

function grab_paddle(obj) {
    obj.style.background = "#ce9";
    clicked_obj = obj;
    document.onmousemove = move_paddle;
}

function move_paddle(e) {
    var scale = 1;
    var offset = -200;
    if ((((e.pageY / scale) + offset) > 0)
	&&
	(((e.pageY / scale) + offset) < (arena_height - 75))) {
	clicked_obj.style.top = ((e.pageY / scale) + offset) + "px";
    }
}

function move_player2_paddle() {
    var y = document.getElementById("ball2").style.top;
    y = new Number(y.replace(/px/gi, ""));
   
    if (((y - 38) > 0) && ((y) < (arena_height - 45))) {
	document.getElementById("paddleright").style.top = 
	    (y - 38) + "px";
    }
}

function drop_paddle(obj) {
    obj.style.background = "#c9e310";
    clicked_obj = null;
    document.onmousemove = null;
}


function move_ball(ball_id,increment_x,increment_y) {
    var x = document.getElementById(ball_id).style.left;
    var y = document.getElementById(ball_id).style.top;

    var state = "normal";

    x = new Number(x.replace(/px/gi, ""));
    y = new Number(y.replace(/px/gi, ""));
 
    if (x > (arena_width - 110)) {
	increment_x = increment_x * -1;

	var right_paddle_y = document.getElementById("paddleright").style.top;
	
	right_paddle_y = new Number(right_paddle_y.replace(/px/gi, ""));
	
	if ((y < right_paddle_y)
	    ||
	    (y > (right_paddle_y + paddle_height))) {
	    var score = new Number(document.getElementById("player1_score").innerHTML);
	    score = score + 1;
	    document.getElementById("player1_score").innerHTML = score;

	    document.getElementById("info").innerHTML = "player 2 missed!";
	    document.getElementById("info").style.background = "red";

	    state = "player2_missed";

	}
	else {
	    document.getElementById("info").innerHTML = "player 2 saved!";
	    document.getElementById("info").style.background = "green";
	}
    }

    if (x < 0) {
	increment_x = increment_x * -1;	
	var left_paddle_y = document.getElementById("paddleleft").style.top;
	left_paddle_y = new Number(left_paddle_y.replace(/px/gi, ""));

	if ((y < left_paddle_y)
	    ||
	    (y > (left_paddle_y + paddle_height))) {
	    var score = new Number(document.getElementById("player2_score").innerHTML);
	    score = score + 1;
	    document.getElementById("player2_score").innerHTML = score;

	    document.getElementById("info").innerHTML = "player 1 missed!";
	    document.getElementById("info").style.background = "red";

	    state = "player1_missed";

	}
	else {
	    document.getElementById("info").innerHTML = "player 1 saved!";
	    document.getElementById("info").style.background = "green";
	}
    }

    if ((y > 390) || (y < 0)) {
	increment_y = increment_y * -1;
    }
    
    x = x + increment_x;
    y = y + increment_y;
 
    if ((state == "player1_missed")
	||
	(state == "player2_missed")) {
	x = arena_width / 2.0;
	y = arena_height / 2.0;
    }

    document.getElementById(ball_id).style.left = x+"px";
    document.getElementById(ball_id).style.top = y+"px";

    move_player2_paddle();

    if (state == "normal") {
	setTimeout("move_ball('"+ball_id+"',"+increment_x+","+increment_y+")", 10);
    }

    if ((state == "player1_missed")
	||
	(state == "player2_missed")) {
	setTimeout("move_ball('"+ball_id+"',"+increment_x+","+increment_y+")", 400);
    }

}
