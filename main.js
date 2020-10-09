'use strict;'

// const btn = document.createElement('button');
// btn.innerText = 'New Button';
// document.body.appendChild(btn);
// btn.addEventListener('click',()=>{alert('vvv');}); 

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');




//var CANVAS_WIDTH = 1400;
//var CANVAS_HEIGHT = 780;
// var airimg = '#ffffff'; //air
// var lavaimg = '#ff0000'; //lava              !
// var wallimg = '#000000'; //wall            x
// var coinimg = '#ffbb00'; //coins          *
// var jumpimg = '#006934';  //jumpPlatform   =
// var blue = '#0000ff'; // player          @
// var platformimg = '#c702ae'; //platform      -
// var iceimg = '#00ffff'; //ice           ~
// var healimg = '#64ff4f'; //heal       +
// var mudimg = '#9c5500'; //mud             ,
var scale = 0.5;
var size = 32*scale;
var playerimg = new Image(size, size);
playerimg.src = 'player64.png';
var playerwin = new Image(size, size);
playerwin.src = 'playerwin.png';
var deadplayer = new Image(size, size);
deadplayer.src = 'deadplayer64.png';
var airimg = new Image(size, size);
airimg.src = 'air64.png';
var coinimg = new Image(size, size);
coinimg.src = 'coin64.png';
var platformimg = new Image(size, size);
platformimg.src = 'platform64.png';
var jumpimg = new Image(size, size);
jumpimg.src = 'jump64.png';
var lavaimg = new Image(size, size);
lavaimg.src = 'lava64.png';
var healimg = new Image(size, size);
healimg.src = 'heal64g.png';
var mudimg = new Image(size, size);
mudimg.src = 'mud64.png';
var iceimg = new Image(size, size);
iceimg.src = 'ice64.png';
var wallimg = new Image(size, size);
wallimg.src = 'wall64.png';
var duckimg = new Image(size, size);
duckimg.src = 'duck64.png';
var level = [
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "x     x+   x                                                              x",
    "x     x    x                                                              x",
    "x     x                                            +                      x",
    "x--x  x                                                                   x",
    "x  x xx    !                                                              x",
    "x  x     ~,,~~!!!        x  x  xxxxxxxxx~~~~~~~~~                         x",
    "x  x      x   xxx~~~,,   x x  x                                           x",
    "x  x~~~~  x              x x  x                                           x",
    "x            ,,,,,,,,,,,,x x  xxx               $                         x",
    "x    $          $ + $ + $  x  $+x                                         x",
    "x         $                x  xxx                                         x",
    "x==           ~~~~~~~~~~~~~x  x                                           x",
    "x                          x  x                                           x",
    "x                          x  x                                           x",
    "x ~~  ,,  ,,,              x  x                                           x",
    "x              $           x  x                                           x",
    "x                          x  x                                           x",
    "x  ,,,,,,,,,,,   x         x  x                                           x",
    "x            x!!!x         x  x                                           x",
    "x            xxxxx         x  x                                           x",
    "xx,,,,,,,,x--x             x$ x                                           x",
    "x$        x  x             x $x                                           x",
    "x         x  x             x$ x                                           x",
    "x-------x-x--x             x $x                                           x",
    "x       x x  x             x$ x                                           x",
    "x       x x  x             x $x                                           x",
    "x xxxxxxx x--x             x$ x                                           x",
    "x       x x  x       $x    x  x  $                                        x",
    "x   $   x x  x      x x    x  x                                           x",
    "xxxxxxx x x  xxxxxxxx xxxxxx  xxxxxxxxxxxxxx                              x",
    "x       x x  x                             x          $              xxxxxx",
    "x@      x                                 +x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x",
    "xxxxxxxxxxx==xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx x"  
    
    ];
  var level1 = [

  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x                                                                         x",
  "x    $      x    $                                                        x",
  "x  xxxxxxx  x                                                             x",
  "x  x     x  x                 $                                           x",
  "x  x     x  x                ~~~~                                         x",
  "x  x  xx x--x           ~~~                                               x",
  "x  x  x  x  x--                              @                            x",
  "x  x  x  x  x                                                             x",
  "x  x  x--x  x       ~--~                                                  x",
  "x  x  x--x  x       ~~~~                +                                 x",
  "x  x        x                                                             x",
  "x  x        x           ===                                               x",
  "x  xx----xxxx        $                    +                               x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x                                                                         x",
  "x            --- x!!!x          x       x   ++                            x",
  "xxxxx~~~~~~~xxxxxxxxxxxxxx===xxxx,,,,,,xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  
  ];
  var convertedLevel = [];
  
  var convertLevel = function(lvl)
  {
      
      for (let i = 0; i < lvl.length; i++)
      {
          convertedLevel.push(level[i].split(''));
      }
  }
  convertLevel(level);

canvas.width = convertedLevel[0].length*size;
canvas.height = convertedLevel.length*size;
var FPS = 30;
var then, now, past, fpsInterval;


function Object (x,y,width,height,pic)
{
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
   // this.color=color;
    this.pic=pic;
}

var objects =[];

var playerPosX;
var playerPosY;
var gravitation = 0.8*scale
// гравець
var player = {
    width : size,
    height : size-1,
    xPrev:0,
    yPrev:0,
    x : 0,
    y : 0,
    xVelocity : 0,
    yVelocity : 0,
    pic : playerimg,
    points:0,
    health:100,
    inAir:true,
    inLava:false,
    isDead:false
    
};

var controller= {
    left:false,
    right:false,
    up: false,
    down : false,
    KeyListener:function(evt)
    {
        var keyState = (evt.type == "keydown") ? true : false;
        switch(evt.keyCode)
        {
            case 37:
                controller.left = keyState;
                break;
            case 39:
                controller.right = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
            case 40:
                controller.down = keyState;
                break;
        }
    }
};


var drawTile = function(tile)
{
    context.fillStyle = tile.color;
   // context.fillRect(tile.x,tile.y,tile.width,tile.height);
    var imag = tile.pic;
    context.drawImage(tile.pic,tile.x,tile.y,size,size);
    if(end==true)
    {
        if(tile.pic == airimg)
        {
            tile.pic=duckimg;
        }
    }
}


var readTileImage = function(tile)
{
    switch(tile){
        case "@":
            return playerimg
            break;
        case "x":
            return wallimg
            break;
        case "!":
            return lavaimg
            break;
        case "$":
            return coinimg
            break;
        case "-":
            return platformimg
            break;
        case "~":
            return iceimg
            break;
        case "+":
            return healimg
            break;
        case "=":
            return jumpimg
            break;
        case ",":
            return mudimg
            break;
        default:
            return airimg
            break;
    }
}



var startAnimation = function(fps)
{
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    animation(then);
}

var animation = function(newTime) // кадри щосекунди
{
    window.requestAnimationFrame(animation);
    now = newTime;
    past = now - then;
    if(past > fpsInterval)
    {
        then = now - (past%fpsInterval);
        draw();
        timer();
    }
}


var isCollided = function(obst, obj)
{
    
    if (obj.x+obj.width  > obst.x 
        && obj.x < obst.x + obst.width
        && obj.y < obst.y + obst.height
        && obj.y + obj.height  > obst.y)
        {
            //console.debug("coll");
            return true;
        }
        else
        {
            return false;
        }
}

var collideHandler = function(obst,obj,pic)
{
    if (isCollided(obst,obj))
    {
        if(pic==wallimg||pic==iceimg||pic==jumpimg||pic==mudimg)
        {
            if(obj.yPrev + obj.height <= obst.y)
            {
                obj.y = obst.y - obj.height;
                obj.yVelocity = 0;
                obj.inAir = false;
                if(pic==jumpimg)
                obj.yVelocity=-6*scale;
                if(pic==mudimg)
                obj.yVelocity=+7*scale;
               // console.debug("down : "+obj.x);
            }
            else if (obst.x + obst.width <= obj.xPrev) //зліва (obst.x + obst.width <= obj.xPrev)
            {
                obj.x = obst.x + obst.width;
                obj.xVelocity = 0;
                //console.debug("left : "+obj.x);
            }
            else if (obj.xPrev + obst.width <= obst.x) //справа
            {
                obj.x = obst.x - obj.width;
                obj.xVelocity = 0;
               // console.debug("right : "+obj.x);
            }
            else if (obj.yPrev > obst.y + obst.height)
            {
                obj.y = obst.y + obst.height;
                obj.yVelocity =0;
            }
            if(pic==iceimg)
            obj.xVelocity*=1.2;
            if(pic==mudimg)
            obj.xVelocity*=0.3;
            
        }
        if(pic==lavaimg)
        {
            player.health-=1;
            if (player.health<=0)
            {
                player.health=0;
                player.pic = deadplayer;
                player.isDead=true;
            }
            player.inLava=true;
        }
        if(pic==platformimg)
        {
            if (controller.down)
            {
                console.debug("down");
               // obj.y = obst.y + obst.height/2; 
            }
            else if(obj.yPrev + obj.height <= obst.y)
            {
                obj.y = obst.y - obj.height;
                obj.yVelocity = 0;
                obj.inAir = false;
               // console.debug("down : "+obj.x);
            }
            else if (obj.yPrev > obst.y + obst.height)
            {
                obj.y = obst.y + obst.height;
                obj.yVelocity *=1;
            }
            
        }
        if(pic==healimg)
        {
            player.health+=100;
            return true;
        }
        if(pic==coinimg)
        {
            console.debug("COIN!!!!!!!!!!!!!!!!!!");
            player.points++;
            return true;
        }
        
    }
}
var end=false;
var showCounter = function()
{
  
    context.fillStyle = '#000000';
    context.font = 'normal 30px lucida console';
    
    context.fillText("time : " +time,convertedLevel[0].length*size-size*14,size*3);
    context.fillText("coins : " +player.points,convertedLevel[0].length*size-size*14,size*5);
    
    context.font = 'normal 10px lucida console';
    context.fillText(player.health,player.x-1,player.y-5);
    
}
var time =0;
var counter=0;
var timer = function()
{
    if(!end)
    {
        counter++
        if(counter==60)
        {
            time++;
            counter=0;
        }
    }   
}
var draw = function()
    {
        
        if(!player.isDead)
        {
            
            player.xPrev = player.x;
            player.yPrev = player.y;
            if (controller.up&& player.inAir == false)
            {
                player.yVelocity -= 15*scale;
                player.inAir = true;
            }
            
            if(controller.right)
            {
                player.xVelocity +=1*scale;
            }
            if (controller.left)
            {
                player.xVelocity -=1*scale;
            }
            
            for (let index = 0; index < objects.length; index++) 
            {
                drawTile(objects[index]);
            }
        
        
            player.yVelocity+=gravitation;

            
            if(player.inLava)
            {
            player.xVelocity*=0.6;
            player.yVelocity+=0.4*scale;
            player.inLava=false;
            }
            player.x += player.xVelocity;
            player.y += player.yVelocity;
            player.xVelocity *=0.8;
        
        

            for (let i = 0; i < objects.length; i++) {
            // collideHandler(objects[i],player,objects[i].color);
                if (collideHandler(objects[i],player,objects[i].pic) == true)
                {
                objects[i].pic = airimg;
                }
            }
            drawTile(player);
            showCounter();
            if(player.points!=20)
            {
            }
            else
            {
                end=true; 
              
                player.pic=playerwin;
            }
        }
        else
        {
            
        }
        if(player.y>canvas.height+size)
        {
            window.location.href = 'https://s14.stc.all.kpcdn.net/share/i/12/10647586/wr-960.jpg';
        }
    }


var setObjects=function()
{
    for (let i = 0; i < convertedLevel.length; i++)
    {
        for (let j = 0; j < convertedLevel[0].length; j++) 
        {
            //drawTile(size*j,size*i,size,size,readTile(convertedLevel[i][j])) ;
            let object = new Object(size*j,size*i,size,size,readTileImage(convertedLevel[i][j]));
            objects.push(object);
            if(object.pic==playerimg)
            {  
                player.x = object.x;
                player.y = object.y;
                console.debug(object.pic);
                object.pic=airimg;
          
            }
            
        }
    }
}




setObjects();
startAnimation(FPS);


window.addEventListener("keydown",controller.KeyListener);
window.addEventListener("keyup",controller.KeyListener);




