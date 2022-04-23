var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var character = new Image();
character.src = "images/char.png";

var bg = new Image();
bg.src = "images/bg.png";

var bmb = new Image();
bmb.src = "images/bomb.png";

var bmb2 = new Image();
bmb2.src = "images/bomb.png";

var x = 220; var y = 350;
var bx = 100; var by = 100;
var bx2 = 400; var by2 = 100;

var dbx = Math.random() * 3 + 2;
if(Math.random() >= 0.5)
{
    dbx = -dbx;
}
var dby = Math.random() * 3 + 2;
if(Math.random() >= 0.5)
{
    dby = -dby;
}
var dbx2 = Math.random() * 3 + 2;
if(Math.random() >= 0.5)
{
    dbx2 = -dbx2;
}
var dby2 = Math.random() * 3 + 2;
if(Math.random() >= 0.5)
{
    dby2 = -dby2;
}

var score = 0;

addEventListener("keydown", move);

function move(e)
{
    if(e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 119)
    {
        y -= 5;
        if(y <= 0)
        {
            y = 0;
        }
    }
    else if(e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 97)
    {
        x -= 5;
        if(x <= 0)
        {
            x = 0;
        }
    }
    else if(e.keyCode == 40 || e.keyCode == 83 || e.keyCode == 115)
    {
        y += 5;
        if(y >= 470)
        {
            y = 470;
        }
    }
    else if(e.keyCode == 39 || e.keyCode == 68 || e.keyCode == 100)
    {
        x += 5;
        if(x >= 470)
        {
            x = 470;
        }
    }
}

function moveBombs()
{
    bx += dbx; by += dby;
    if(bx < 0 || bx+bmb.width > canvas.width)
    {
        dbx = -dbx;
        bx += dbx;
    }
    if(by < 0 || by+bmb.height > canvas.height)
    {
        dby = -dby;
        by += dby;
    }
    bx2 += dbx2; by2 += dby2;
    if(bx2 < 0 || bx2+bmb2.width > canvas.width)
    {
        dbx2 = -dbx2;
        bx2 += dbx2;
    }
    if(by2 < 0 || by2+bmb2.height > canvas.height)
    {
        dby2 = -dby2;
        by2 += dby2;
    }
}

explode = false;

function draw()
{
    if(explode == false)
    {
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(character, x, y);
        ctx.drawImage(bmb, bx, by);
        ctx.drawImage(bmb2, bx2, by2);
        ctx.font = "15px Arial";
        ctx.fillText("Score: " + score, 400, 50);
    }
    else
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        explode = false;
        x = 220; y = 350;
        bx = 100; by = 100;
        bx2 = 400; by2 = 100;
        dbx = Math.random() * 3 + 2;
        if(Math.random() >= 0.5)
        {
            dbx = -dbx;
        }
        dby = Math.random() * 3 + 2;
        if(Math.random() >= 0.5)
        {
            dby = -dby;
        }
        dbx2 = Math.random() * 3 + 2;
        if(Math.random() >= 0.5)
        {
            dbx2 = -dbx2;
        }
        dby2 = Math.random() * 3 + 2;
        if(Math.random() >= 0.5)
        {
            dby2 = -dby2;
        }
        alert("Game Over!\nScore: " + score);
        score = 0;
    }
    requestAnimationFrame(draw);
}

function addScore()
{
    score += 1;
}

function gameOver()
{
    if(((x+character.width >= bx) && (x <= bx+bmb.width) && (y+character.height >= by) && (y <= by+bmb.height)) || (x+character.width >= bx2) && (x <= bx2+bmb2.width) && (y+character.height >= by2) && (y <= by2+bmb2.height))
    {
        explode = true;
    }
}
