//variables pour créer les sprites
var nebula, ship, button;
//variables pour les images
var nebulaImg, vaisseauImg,thrustImg, rockImg, laserImg, explosionImg, buttonImg
var groupOrocks, laserp
//dimension zone de jeu
var LARGEUR = 1000;
var HAUTEUR = 600;
var speedyGonzales = 5
// variables états de jeu
var vie, score, best;
lives = 3;
score = 0;
best = 0;

var stage = "beginning";

function preload(){
  //télécharger les images ici
  nebulaImg = loadImage("nebula.jpeg");
  vaisseauImg = loadImage("spaceship.png");
  thrustImg = loadImage("thrust.png");
  rockImg = loadImage("rock.png")
  laserImg = loadImage("laser.png")
  buttonImg = loadImage("play.png")
  explosionImg = loadAnimation("e0.png","e1.png","e2.png","e3.png","e4.png","e5.png","e6.png", "e7.png","e8.png","e9.png","e10.png","e11.png","e12.png","e13.png","e14.png", "e15.png");
}

function setup(){
  createCanvas(LARGEUR,HAUTEUR)
  
  nebula = createSprite(200,200,200,200);
  nebula.addImage(nebulaImg);
  nebula.scale = 1.2;
  button = createSprite(200, 100);
  groupOrocks = createGroup();
  laserp = createGroup();
  button.addImage( buttonImg);
  button.scale = 0.15;

  ship = createSprite(200,200,20,20);
  ship.addAnimation("spaceship",vaisseauImg);
  ship.addAnimation("thrust",thrustImg);
  ship.scale = 0.15;
  ship.debug = false;
  ship.setCollider("rectangle",0,0,450,350);

}



function draw(){
  drawSprites();
  if(stage === "beginning"){
    if(mousePressedOver(button)){
      stage = "play";
      button.visible = false;
    }
  }

if(stage === "over"){
    textFont("Georgia");
    fill("yellow");
    textSize(50);
    text("YOU FAILED!!", 50, 200);
    button.visible = true; 
     if(mousePressedOver(button)){
      stage = "play";
      button.visible = false;
      score = 0;
      lives = 3;
       
     }
  }
 
  //move the ship 
    if(keyDown("right")){
    ship.rotation += 10;
  }
  if(keyDown("left")){
    ship.rotation += -10;
  
  }
  if(keyDown("up")){
    ship.changeAnimation("thrust");
    ship.velocityX  += Math.cos(radians(ship.rotation))*speedyGonzales;
    ship.velocityY  += Math.sin(radians(ship.rotation))*speedyGonzales;
  }
  
  if (keyWentUp("up")){
    ship.changeAnimation("spaceship");
  }
 
  ship.velocityX /= 1.2;
  ship.velocityY /= 1.2;
  through(ship);
 
  
 if(stage === "play") {
  moonrocks();

  lazers();  
 
  fill("red");
  textSize(20);
  text("score:"+ score, 249, 47);
  
 
 
  fill("green");
  textSize(20);
  text("lives:"+ lives, 53, 47);
 
  if(lives === 0){
    stage = "over";
  }
  
  
  
   //    spaceship rock collision
  for (var i = 0; i < groupOrocks.length; i++) {
   
     if (ship.isTouching(groupOrocks.get(i))) {
       var explosion1 = createSprite(groupOrocks.get(i).x, groupOrocks.get(i).y);
       explosion1.addAnimation("explosion", explosionImg);
       explosion1.scale = 3;
       explosion1.lifetime = 30;
       groupOrocks.get(i).destroy();
       lives += -1;
        }
           
  }
    
  for (var g = 0; g < groupOrocks.length; g++) {
    through(groupOrocks.get(g));
  }
  //laser rock collision
  for (var b = 0; b < laserp.length; b++) {
    for (var n = 0; n < groupOrocks.length; n++) {
        if (laserp.get(b).isTouching(groupOrocks.get(n))) {
        var explosion = createSprite(groupOrocks.get(n).x, groupOrocks.get(n).y);
        explosion.addAnimation("explosion", explosionImg);
        explosion.scale = 3;
        explosion.lifetime = 30;
        groupOrocks.get(n).destroy();
        score += 100;
          
        }
    } 
  }
  
}
}

function through(sprite){
  if (sprite.x > LARGEUR){
    sprite.x = 0;
  }
   if (sprite.x < 0){
    sprite.x =  LARGEUR;
  }
  if (sprite.y > HAUTEUR){
    sprite.y = 0;
  }
  if (sprite.y < 0){
    sprite.y = HAUTEUR;
   }
  
  
}


 function moonrocks(){
  if (World.frameCount %30 === 0){
  var x =  Math.random()*LARGEUR;
  var y =  Math.random()*HAUTEUR;
  while (Math.abs(ship.x-x)<100 && Math.abs(ship.y-y)<100) {
     x =  Math.random()*LARGEUR;
     y =  Math.random()*HAUTEUR;
  }
  var rocks = createSprite(x, y);
  rocks.addImage(rockImg);
  rocks.scale = 0.2;
  rocks.velocityX = Math.random()*10-5;
  rocks.velocityY = Math.random()*10-5;
groupOrocks.add(rocks);
   rocks.debug = false;
   rocks.setCollider("circle", 0, 0, 200);
 
  }
}


function lazers(){
 if(keyDown("space")){
   var lazer = createSprite(ship.x, ship.y);
   lazer.addImage(laserImg);
    lazer.velocityX  += Math.cos(radians(ship.rotation))*speedyGonzales*4;
    lazer.velocityY  += Math.sin(radians(ship.rotation))*speedyGonzales*4;
      laserp.add(lazer);
      lazer.debug = false;
      lazer.setCollider("circle", 0, 0, 35       );
      lazer.rotation = ship.rotation;

}
}

