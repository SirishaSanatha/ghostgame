var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png","ghost-jumping.png");
  ghoststableimg=loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav"); 
  r=loadImage("restart.png");   
  dieghost=loadImage("ghost.png");
}

function setup(){
  spookySound.loop();
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  invisibleground=createSprite(300,590,600,10);
  invisibleground.visible=false;
  
  ghost = createSprite(200,200,50,100);
  ghost.scale = 0.3;
  ghost.addAnimation("ghost", ghostImg);
   ghost.addAnimation("stop",ghoststableimg);
  ghost.addAnimation("die",dieghost);
 // ghost.debug=true;
  ghost.setCollider("rectangle",-20,10,150,250);
   restart=createSprite(250,350);
    restart.addImage(r);
    restart.scale=0.7;
  
}

function draw(){
  background(0);
 
  if (gameState === "play") {
    
    tower.velocityY = 2 ;
  
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
      ghost.changeAnimation("ghost", ghostImg);
    }
    
    ghost.velocityY = ghost.velocityY + 0.5
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
     restart.visible=false;
    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      ghost.changeAnimation("stop",ghoststableimg);
    }
    if(invisibleBlockGroup.isTouching(ghost)){
      ghost.visible=false;
      gameState = "end"
    }
   
    if(ghost.y>600)
{
  ghost.y=300;
   ghost.changeAnimation("die",dieghost);
}   
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("GAME OVER", 170,150)
   restart.visible=true;
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
     tower.velocityY=40;
    if(mousePressedOver(restart)){
       reset();
       }
    }
  // ghost.collide(invisibleground );
    
  drawSprites();
   textSize(20);
    fill("Black")
    stroke("white");
    textFont("comic sans");
     text("Use right and left arrows to move right and left",80,20);
}

function reset(){
  gameState="play";
  ghost.visible=true;
  ghost.changeAnimation("ghost", ghostImg);
}
function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

