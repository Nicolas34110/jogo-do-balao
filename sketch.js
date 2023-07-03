var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obstacleTop2, obstacleTopGroup
var obstacleBottom1, obstacleBottom2, obstacleBottom3, obstacleBottom, obstacleBottomGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var restart, restartImg
var gameOver, gameOverImg
var jumpSound, dieSound
var score=0

function preload(){
bgImg = loadImage("assets/bg.png")
obstacleTop2 = loadImage("assets/obsTop2.png");
obstacleBottom1 = loadImage("assets/obsBottom1.png");
obstacleBottom2 = loadImage("assets/obsBottom2.png");
obstacleBottom3 = loadImage("assets/obsBottom3.png");
gameOverImg= loadImage("assets/fimdejogo.png");
restartImg = loadImage("assets/restart.png");

jumpSound = loadSound("assets/jump.mp3");
dieSound = loadSound("assets/die.mp3")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){

createCanvas(1300,700);

//imagem de plano de fundo
//bg = createSprite(1200,700,1,1);
//bg.addImage(bgImg);
//bg.scale = 1.3

//criando canto superior e inferior
//bottomGround = createSprite(200,390,800,20);
//bottomGround.visible = true;

//topGround = createSprite(200,10,800,20);
//topGround.visible = true;
      
//criando o balão     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.4;

obstacleBottomGroup = new Group();
obstacleTopGroup = new Group();

gameOver = createSprite(650,300);
  gameOver.addImage(gameOverImg);

restart = createSprite(650,350);
  restart.addImage(restartImg);
}



function draw() {
  
  background(bgImg);

  if(gameState===PLAY){
    restart.visible = false;
    gameOver.visible = false;

    textSize(25);
    text("Pontuação: "+score,50,50)
    score=score+Math.round(getFrameRate()/60);
        
  //fazendo o balão de ar quente pular
  if(keyDown("space")) {
  balloon.velocityY = -6 ;
  //jumpSound.play();
  }

  //adicionando gravidade
   balloon.velocityY = balloon.velocityY + 2;

  if(obstacleBottomGroup.isTouching(balloon) || obstacleTopGroup.isTouching(balloon)){
    gameState = END;
    dieSound.play();
  }

  obstacleCima();

  obstacleBaixo();
  }

  if(gameState===END){
   obstacleBottomGroup.setVelocityXEach(0);
   obstacleTopGroup.setVelocityXEach(0);

         balloon.velocityX=0;
         balloon.velocityY=0;
         balloon.visible = false;

         restart.visible = true;
         gameOver.visible=true;

         if(mousePressedOver(restart)){
          reset();
         }

         
        }
        drawSprites();
        
}

function obstacleCima(){

  if(frameCount%160 ===0){

  obstacleTop = createSprite(1300,50,40,40);
  obstacleTop.addImage(obstacleTop2);
  obstacleTop.scale=0.2;
  
  obstacleTop.velocityX =-4;
  
  obstacleTop.y=random(40,300);

  obstacleTopGroup.add(obstacleTop);
  } 

}

function obstacleBaixo(){
  if(frameCount%100 ===0){

    obstacleBottom = createSprite(1300,530);
    obstacleBottom.velocityX= -4;
    obstacleBottom.scale=0.2;

    var rand=Math.round(random(1,3));
    switch(rand){
      case 1: obstacleBottom.addImage(obstacleBottom1);
       break;
      case 2: obstacleBottom.addImage(obstacleBottom2);
       break;
      case 3: obstacleBottom.addImage(obstacleBottom3);
       break;
      default:break;
    }
  
  obstacleBottomGroup.add(obstacleBottom);
  obstacleBottom.depth = restart.depth;
  restart.depth+=1;
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  balloon.visible = true;
  obstacleBottomGroup.destroyEach();
  obstacleTopGroup.destroyEach();
  score = 0;
}
