var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner, runner_running, runner_collided;
var runner2, runner_running2, runner_collided2;
var ground2, invisibleGround2, groundImage2;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;
var score1=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  runner_running =   loadImage("r.png");
  runner_running2 =   loadImage("r.png");
  
  groundImage = loadImage("ground2.png");
  groundImage2 = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("h.png");
  obstacle2 = loadImage("h.png");
  obstacle3 = loadImage("h.png");
  obstacle4 = loadImage("h.png");
  obstacle5 = loadImage("h.png");
  obstacle6 = loadImage("h.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);
  
  runner = createSprite(50,180,20,50);
  runner2 = createSprite(50,380,20,50);
  
  runner.addAnimation("running", runner_running);
  runner.scale = 0.050;
  
  runner2.addAnimation("running2", runner_running2);
  runner2.scale = 0.050;
  

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  ground2 = createSprite(200,380,400,20);
  ground2.addImage("ground",groundImage2);
  ground2.x = ground2.width /2;
  ground2.velocityX = -(6 + 3*score1/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  invisibleGround2 = createSprite(200,390,400,10);
  invisibleGround2.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  text("Score: "+ score, 500,50);
  text("Score: "+ score1, 500,250);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    score1 = score1 + Math.round(getFrameRate()/60);
    ground2.velocityX = -(6 + 3*score1/100);
  
    if(keyIsDown(UP_ARROW) && runner.y < 160) {
      runner.y= 50;
    }
    if(keyIsDown(UP_ARROW) && runner2.y < 360) {
      runner2.y= 250;
    }
    runner.velocityY = runner.velocityY + 0.8
    runner2.velocityY = runner2.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (ground2.x < 0){
      ground2.x = ground2.width/2;
    }
  
    runner.collide(invisibleGround);
    runner2.collide(invisibleGround2);
    spawnClouds();
    spawnObstacles();
    spawnClouds1();
    spawnObstacles1();

   /* if(score > 1000 || score1 > 1000){
      background("grenn");
      text("YOU WIN",300,200);
      
    }*/
  
    if(obstaclesGroup.isTouching(runner)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    runner.velocityY = 0;
    ground2.velocityX = 0;
    runner2.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the runner animation
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = runner.depth;
    runner.depth = runner.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds1() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,320,40,10);
    cloud.y = Math.round(random(280,320));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = runner.depth;
    runner.depth = runner.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles1() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,365,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score1/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  score1 = 0;
  
}