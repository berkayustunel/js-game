var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var character = new Image();
character.src = "images/char.png";

var bg = new Image();
bg.src = "images/bg.png";

var x = 220; var y = 400;
var dx = 0; var dy = 0;
var bmb = [];
var bx = []; var by = [];
var dbx = []; var dby = [];
var i = 1;

bmb[1] = new Image();
bmb[1].src = "images/bomb.png";
bx[1] = Math.random()*canvas.width; by[1] = Math.random()*canvas.height;
dbx[1] = Math.random()*2; if(Math.random() >= 0.5){dbx[1] *= -1}
dby[1] = Math.random()*2; if(Math.random() >= 0.5){dby[1] *= -1}

var score = 0;

addEventListener("keydown", move);

function move(e)
{
    if(e.keyCode == 38 || e.keyCode == 87 || e.keyCode == 119)
    {
        dy = -3;
    }
    else if(e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 97)
    {
        dx = -3;
    }
    else if(e.keyCode == 40 || e.keyCode == 83 || e.keyCode == 115)
    {
        dy = 3;
    }
    else if(e.keyCode == 39 || e.keyCode == 68 || e.keyCode == 100)
    {
        dx = 3;
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

function createBomb()
{
    i += 1;
    bmb[i] = new Image();
    bmb[i].src = "images/bomb.png";
    bx[i] = Math.random()*canvas.width; by[i] = Math.random()*canvas.height;
    dbx[i] = Math.random()*2; if(Math.random() >= 0.5){dbx[i] *= -1}
    dby[i] = Math.random()*2; if(Math.random() >= 0.5){dby[i] *= -1}
}

explode = false;

function draw()
{
    if(explode == false)
    {
        ctx.drawImage(bg, 0, 0);
        x += dx;
        if(x <= 0){x = 0}
        if(x >= canvas.width-character.width){x = canvas.width-character.width}
        y += dy;
        if(y <= 0){y = 0}
        if(y >= canvas.height-character.height){y = canvas.height-character.height}
        ctx.drawImage(character, x, y);
        for(var j = 1; j <= i; j++)
        {
            bx[j] += dbx[j];
            if(bx[j] <= 0){bx[j] = 0; dbx[j] *= -1}
            if(bx[j] >= canvas.width-bmb[j].width){bx[j] = canvas.width-bmb[j].width; dbx[j] *= -1}
            by[j] += dby[j];
            if(by[j] <= 0){by[j] = 0; dby[j] *= -1}
            if(by[j] >= canvas.height-bmb[j].height){by[j] = canvas.height-bmb[j].height; dby[j] *= -1}
            ctx.drawImage(bmb[j], bx[j], by[j]);
        }
        ctx.font = "15px Arial";
        ctx.fillText("Score: " + score, 400, 50);
        score += 1;
        for(var j = 1; j <= i; j++)
        {
            if(x+character.width >= bx[j] && x <= bx[j]+bmb[j].width && y+character.height >= by[j] && y <= by[j]+bmb[j].height)
            {
                explode = true;
                x = 220; y = 400;
                dx = 0; dy = 0;
                bmb = [];
                bx = []; by = [];
                dbx = []; dby = [];
                i = 1;
                bmb[1] = new Image();
                bmb[1].src = "images/bomb.png";
                bx[1] = Math.random()*canvas.width; by[1] = Math.random()*canvas.height;
                dbx[1] = Math.random()*2; if(Math.random() >= 0.5){dbx[1] *= -1}
                dby[1] = Math.random()*2; if(Math.random() >= 0.5){dby[1] *= -1}
                break;
            }
        }
    }
    else
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        explode = false;
        x = 220; y = 350;
        dx = 0; dy = 0;
        alert("Game Over!\nScore: " + score);
        score = 0;
    }
    requestAnimationFrame(draw);
}
