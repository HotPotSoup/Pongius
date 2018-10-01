    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height/2;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 75;
    var paddleWidth = 10;
    var paddleX = 0;
    var paddleY = canvas.height/2 - paddleHeight/2;
    var downPressed = false;
    var upPressed = false;
    var score = 0;
    var img = new Image();
    var imgp = new Image();
    img.src = 'ball.png';
    imgp.src = 'paddle.png';
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
        if(e.keyCode == 40) {
            downPressed = true;
        }
        else if(e.keyCode == 38) {
            upPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 40) {
            downPressed = false;
        }
        else if(e.keyCode == 38) {
            upPressed = false;
        }
    }
    function drawBall() {
        // ctx.beginPath();
        // ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.drawImage(img, x - ballRadius, y - ballRadius);
        // ctx.fillStyle = "#0095DD";
        // ctx.fill();
        // ctx.closePath();
    }
    function drawPaddle() {
        // ctx.beginPath();
        // ctx.rect(0, paddleY, paddleWidth, paddleHeight);
        ctx.drawImage(imgp, paddleX, paddleY);
        // ctx.fillStyle = "#0095DD";
        // ctx.fill();
        // ctx.closePath();
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        document.getElementById("score").innerHTML = score;
        if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }
        if(x + dx > canvas.width-ballRadius) {
            dx = -dx;
        }
        else if(x + dx < paddleWidth + ballRadius * 2) {
            if(y > paddleY && y < paddleY + paddleHeight) {
                dx = -dx;
                score++;
                dx = dx + 0.25;
                dy = dy + 0.25;
            }
            else if (x + dx < ballRadius) {
                clearInterval(game);
                alert("GAME OVER. SCORE = " + score);
                document.location.reload();
            }
        }
        if(downPressed && paddleY < canvas.height-paddleHeight) {
            paddleY += 7;
        }
        else if(upPressed && paddleY > 0) {
            paddleY -= 7;
        }
        x += dx;
        y += dy;
    }
    var game = setInterval(draw, 10);