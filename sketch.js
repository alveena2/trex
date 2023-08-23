var PLAY=1;
var END=0;
var gamestate=PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacles1,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6;
var obstaclegroup;
var cloudgroup;
var score=0;
var gameOver,restart;
var gameOverimage,restartimage;
var trexcollide
var jumpSound,dieSound,checkpointSound
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  
  
  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
 
  obstacles1=loadImage("obstacle1.png");
  obstacles2=loadImage("obstacle2.png");
  obstacles3=loadImage("obstacle3.png");
  obstacles4=loadImage("obstacle4.png");
  obstacles5=loadImage("obstacle5.png");
  obstacles6=loadImage("obstacle6.png");

  gameOverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");

  trexcollide=loadAnimation("trex_collided.png");

  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkpoint.mp3");
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite(50,height-50,50,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collision",trexcollide);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(width/2,height-70,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //creating invisible ground
  invisibleGround = createSprite(200,height-50,400,10);
  invisibleGround.visible = false;

  gameOver=createSprite(width/2,height/2);
  gameOver.addImage("gameOver.png",gameOverimage);
  gameOver.scale=2;
  restart=createSprite(width/2,height/2-50);
  restart.addImage("restart.png",restartimage);
  restart.scale=0.5

  obstaclegroup=createGroup();
  cloudgroup=createGroup();
    
  
  //generate random numbers
 // var rand =  Math.round(random(1,100))
  //console.log(rand)
  trex.setCollider("circle",0,0,40);
  trex.debug=true
}

function draw() {
  //set background color
  background(180);
  text("score: "+score,500,50);
  

  
  if(gamestate===PLAY){
    //console.log(trex.y)
    gameOver.visible = false;
    restart.visible = false;
  console.log(frameCount);
  score=score+Math.round(getFrameRate()/60)
  if(score>0 && score%100===0){
    checkpointSound.play();
  }
  ground.velocityX = -(6+3*score/100);
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= height-120 || touches.length>0) {
    jumpSound.play();
    trex.velocityY = -10;
    touches=[];
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  
  //Spawn Clouds
  spawnClouds();
  spawnObstacles();
if(obstaclegroup.isTouching(trex)){
  dieSound.play();
  gamestate=END
}

  
  }
  else if(gamestate===END){
    ground.velocityX=0
    gameOver.visible=true;
    restart.visible=true;
    trex.changeAnimation("collision",trexcollide);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    if(mousePressedOver(restart) || touches.length>0){
      reset()
      touches=[];

    }
     
  }
  trex.collide(invisibleGround);
  drawSprites();
  
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if(frameCount%60===0){
  cloud=createSprite(width,height-450,40,10);
  cloud.y=Math.round(random(100,200));
 cloud.velocityX=-3;
 cloud.addImage(cloudImage);
 cloud.scale=0.4;
 cloud.lifetime=300;
 cloud.depth=trex.depth;
 trex.depth=trex.depth+1;
 cloudgroup.add(cloud)
 }
}
function spawnObstacles(){
  if(frameCount%60===0){
    obstacle=createSprite(400,height-80,20,20);
    obstacle.velocityX=-(6+3*score/100);
    var number=Math.round(random(1,6));
    switch(number){
       
    case 1 :obstacle.addImage(obstacles1);
            break;
    case 2 :obstacle.addImage(obstacles2);
            break;
    case 3 :obstacle.addImage(obstacles3);
            break;   
    case 4 :obstacle.addImage(obstacles4);
            break;  
   case 5 :obstacle.addImage(obstacles5);
            break;
  case 6 :obstacle.addImage(obstacles6);
            break;     
      default : break;                        
    }
    obstacle.scale=0.5
    obstacle.lifetime=300;
    obstaclegroup.add(obstacle);

  }
}
 function reset() {
  gamestate=PLAY
  gameOver.visible=false;
  restart.visible=false;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  score=0;
 } 

  



