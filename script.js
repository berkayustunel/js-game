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
var dx = 0; var dy = 0;
var bx = 100; var by = 100;
var bx2 = 400; var by2 = 100;

var dbx = Math.random() * 2 + 1;
if(Math.random() >= 0.5)
{
    dbx = -dbx;
}
var dby = Math.random() * 2 + 1;
if(Math.random() >= 0.5)
{
    dby = -dby;
}
var dbx2 = Math.random() * 2 + 1;
if(Math.random() >= 0.5)
{
    dbx2 = -dbx2;
}
var dby2 = Math.random() * 2 + 1;
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
        dy = -1;
    }
    else if(e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 97)
    {
        dx = -1;
    }
    else if(e.keyCode == 40 || e.keyCode == 83 || e.keyCode == 115)
    {
        dy = 1;
    }
    else if(e.keyCode == 39 || e.keyCode == 68 || e.keyCode == 100)
    {
        dx = 1;
    }
}

addEventListener("keyup", stop);

function stop(e)
{
    if(e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 119)
    {
        dy = 0;
    }
    else if(e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 97)
    {
        dx = 0;
    }
    else if(e.keyCode == 40 || e.keyCode == 83 || e.keyCode == 115)
    {
        dy = 0;
    }
    else if(e.keyCode == 39 || e.keyCode == 68 || e.keyCode == 100)
    {
        dx = 0;
    }   
}

explode = false;

function draw()
{
    if(explode == false)
    {
        ctx.drawImage(bg, 0, 0);
        x += dx; if(x <= 0){x = 0}; if(x >= 470){x = 470};
        y += dy; if(y <= 0){y = 0}; if(y >= 465){y = 465};
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
        ctx.drawImage(character, x, y);
        ctx.drawImage(bmb, bx, by);
        ctx.drawImage(bmb2, bx2, by2);
        ctx.font = "15px Arial";
        ctx.fillText("Score: " + score, 400, 50);
        score += 1;
        if(((x+character.width >= bx) && (x <= bx+bmb.width) && (y+character.height >= by) && (y <= by+bmb.height)) || (x+character.width >= bx2) && (x <= bx2+bmb2.width) && (y+character.height >= by2) && (y <= by2+bmb2.height))
        {
            explode = true;
        }
    }
    else
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        explode = false;
        x = 220; y = 350;
        dx = 0; dy = 0;
        bx = 100; by = 100;
        bx2 = 400; by2 = 100;
        dbx = Math.random() * 2 + 1;
        if(Math.random() >= 0.5)
        {
            dbx = -dbx;
        }
        dby = Math.random() * 2 + 1;
        if(Math.random() >= 0.5)
        {
            dby = -dby;
        }
        dbx2 = Math.random() * 2 + 1;
        if(Math.random() >= 0.5)
        {
            dbx2 = -dbx2;
        }
        dby2 = Math.random() * 2 + 1;
        if(Math.random() >= 0.5)
        {
            dby2 = -dby2;
        }
        alert("Game Over!\nScore: " + score);
        score = 0;
    }
    requestAnimationFrame(draw);
}
