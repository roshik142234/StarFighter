const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ship, shipI, shipL, shipG,border;
var e1w1I,e2w1I,e3w1I;
var e1w1,e2w1,e3w1;
var waveCount,wave;
var laser1,laser2,laser3;
var laser1I,laser2I,laser3I;
var explosionI;
var shipHP
var laserG;
var starLI,starEP;
var star,starI,l1,l2,l3;
var starL;
var bossHp;

function preload(){
  engine = Engine.create();
  world = engine.world;
  laser1I = loadImage("Laser1.jpg");
  laser2I = loadImage("Laser2.jpg");
  laser3I = loadImage("Laser3.jpg");
  shipI = loadImage("ship1.jpg");
  e1w1I = loadImage("Wave1.jpg");
  e2w1I = loadImage("Wave1.jpg");
  e3w1I = loadImage("Wave1.jpg");
  explosionI = loadImage("explosion.jpg");
  starI = loadImage("Star.jpg");
  starLI = loadImage("explosion1.jpg");
}


function setup() {
  createCanvas(1440,789);

  Engine.update(engine);


  //related to the ship
  ship = createSprite(width/4, height/2, 50, 50);
  ship.addImage(shipI);
  ship.scale = 0.25;
  ship.setCollider("rectangle",0,0,600,250);
  ship.debug=false;

  shipL = createSprite(ship.x,ship.y,30,15);
  shipL.visible=false;

  shipHP = "full";

  border = createSprite(width*2/3,height/2, 1, height*2);
  border.shapeColor="black";
  border.debug=false;

  //wave 1
  e1w1 = createSprite(1200, height/2,20,20);
  e1w1.addImage(e1w1I);
  e1w1.scale=0.1;
  e1w1.debug=false;

  e2w1 = createSprite(1200, height*3/4,20,20);
  e2w1.addImage(e2w1I);
  e2w1.scale=0.1;
  e2w1.debug=false;
  


  e3w1 = createSprite(1200, height/4,20,20);
  e3w1.addImage(e3w1I);
  e3w1.scale=0.1;
  e3w1.debug=false; 

  //lasers for wave 1
  laser1 = createSprite(e1w1.x,e1w1.y,20,10);
  laser2 = createSprite(e2w1.x,e2w1.y,20,10);
  laser3 = createSprite(e3w1.x,e3w1.y,20,10);
  laser1.visible=false;
  laser2.visible=false;
  laser3.visible=false;
  laser1S="alive";
  laser2S="alive";
  laser3S="alive";

  star = createSprite(1300,height/2,20,20);
  star.addImage(starI);
  star.scale=0.3;
  star.setCollider("rectangle",0,0,500,500);

  border.visible=false;
  
  
  waveCount = 0;

  wave = "0"

  starL = new Group()
  laserG = new Group();
  shipG = new Group();

  bossHP = 100;

}

function draw() {
  background(0); 

  //wave counter
  textSize(20);
  if(wave===1){
    text("Wave: "+waveCount, 1300, 20);
  }
  //controls
  if(keyDown("s")&&shipHP==="full") {
    ship.y = ship.y+10
  }
  if(keyDown("w")&&shipHP==="full") {
   ship.y = ship.y-10
  }
  if(keyDown("a")&&shipHP==="full") {
   ship.x = ship.x-10
 }
 if(keyDown("d")&&shipHP==="full") {
   ship.x = ship.x+10
  }



  //intro
  if(wave==="0"){
    fill(255,255,255);
    text("The First Order is back!",200,44);
    text("They have hijacked a group of rebel X-Wing Starfighters",200,height*1/3-50);
    text("Destroy the fighters and take on the First Order Fleet. Use WASD to manuever. Press the mouse to shoot",200,height*1/2-50);
    text("But beware of the Death Star",200,height*2/3-50);
    text("Your mission, if you choose to accept it, is to annihilate the Death Star and all enemies that stand in your way",200,height*5/6-50);
    text("Press C to start",200,740);
  }

  //wave 1 
  if(wave==="0"){
    e1w1.visible=false;
    e2w1.visible=false;
    e3w1.visible=false; 
    ship.visible=false; 
    star.visible=false;
  }

  if(frameCount%80===0 && wave==="1" && laser1S==="alive"){
    laser1 = createSprite(e1w1.x,e1w1.y,20,10); 
    laserG.add(laser1);
    laser1.velocityX=-10;
    laser1.shapeColor = "red";
    laser1.liftime=144;  
    laser1.addImage(laser1I);   
    laser1.scale=0.1;    
    laser1.depth=e1w1.depth-1;
    laser1.depth=ship.depth-1;
  }

  if (frameCount%80===0 && wave==="1" && laser2S==="alive"){
    laser2 = createSprite(e2w1.x,e2w1.y,20,10);
    laserG.add(laser2);
    laser2.velocityX=-10;
    laser2.shapeColor = "red";
    laser2.liftime=144;
    laser2.addImage(laser2I);
    laser2.scale=0.1;
    laser2.depth=e2w1.depth-1;
    laser2.depth=ship.depth-1;
  }

  if(frameCount%80===0 && wave==="1" && laser3S==="alive"){
    laser3 = createSprite(e3w1.x,e3w1.y,20,10);
    laserG.add(laser3);
    laser3.velocityX=-10;
    laser3.shapeColor = "red";
    laser3.liftime=144;
    laser3.addImage(laser3I);
    laser3.scale=0.1;
    laser3.depth=e3w1.depth-1;
    laser3.depth=ship.depth-1;
  }
  
  
  //to check if the ship is hit
  if(ship.isTouching(laserG)||ship.isTouching(e1w1)||ship.isTouching(e2w1)||ship.isTouching(e3w1)){
    ship.addImage("over",explosionI);
    ship.changeImage("over");
    shipHP="destroyed";
  }
  if(shipG.isTouching(e1w1)){
    e1w1.destroy();
    laser1S="destroyed";
    shipL.destroy();
  }
  if(shipG.isTouching(e2w1)){
    e2w1.destroy();
    laser2S="destroyed";
    shipL.destroy();
  }
  if(shipG.isTouching(e3w1)){
    e3w1.destroy();
    laser3S="destroyed";
    shipL.destroy();
  }
  //Boss Fight
  if(laser1S==="destroyed"&&laser2S==="destroyed"&&laser3S==="destroyed") {

    star.visible=true
    
    textSize(40);
    text("BOSS HEALTH: "+bossHP, 200, 40);
    if(frameCount%40===0){
      l1 = createSprite(1200,Math.round(random(197,592)), 40,20);
      starL.add(l1);
      l1.shapeColor="red";
      l1.velocityX=-15;
      l1.lifetime=80;
    }
    if(frameCount%150===0){
      l3 = createSprite(1200,Math.round(random(197,592)), 800,50);
      starL.add(l3);
      l3.shapeColor="green";
      l3.velocityX=-10;
      l3.lifetime=120;
    }
    
  }
   if(starL.isTouching(ship)){
     shipHP="dead";
     ship.addImage("over",explosionI);
    ship.changeImage("over");
   }
   if(shipG.isTouching(star)&laser1S==="destroyed"&&laser2S==="destroyed"&&laser3S==="destroyed"){
     bossHP=bossHP-1
     shipL.destroy();
   } 
   if(bossHP===0){
    laser1S="gameOver";
    star.addImage("w",starLI) 
    star.changeImage("w");
    star.scale = star.scale+1
    star.depth=star.depth+50
    shipHP="dead";
    ship.visible=false;
    border.visible=false;
    imageMode(CENTER);
    textSize(50);
    text("YOU HAVE DONE IT! YOU SAVED THE GALAXY!", 200,300);
   }
   if(star.scale>100){
     star.destroy();
   }

  ship.collide(border);
  drawSprites();
}

function keyPressed() {
  //wave 1
  if(keyCode===67&&wave==="0"){
    waveCount=1;
    wave="1";

    ship.visible=true;

    e1w1.visible=true;
    e2w1.visible=true;
    e3w1.visible=true;   
    
    e1w1.velocityX=-4;
    e1w1.lifetime=360;

    e2w1.velocityX=-5;
    e2w1.lifetime=288;
    
    e3w1.velocityX=-3;
    e3w1.lifetime=480;   

    laser1.destroy();
    laser2.destroy();
    laser3.destroy();
    shipL.destroy();
    
  }
}

function mouseReleased(){
  if(shipHP==="full"&&waveCount===1){
    shipL = createSprite(ship.x,ship.y,30,10);
    shipG.add(shipL);
    shipL.velocityX = 13;
    shipL.shapeColor = "blue"
  }
}

