var backgroundImg;
var screwImg;
var roverForwardImg, roverLeftImg, roverRightImg;
var fuelImg;
var fuelCount = 200;
var lifeCount = 200;
var rover;
var fuel, screws, fuelGroup, screwGroup;
var gameState = "play";

function preload()
{
  backgroundImg = loadImage("mars-background2.webp");
  screwImg = loadImage("screw.png");
  roverForwardImg = loadAnimation("roverForward.png");
  roverLeftImg = loadAnimation("roverLeft.png");
  roverRightImg = loadAnimation("roverRight.png");
  fuelImg = loadImage("fuel_canisters.png");

}

function setup()
{
  createCanvas(1600,800);

  rover = createSprite(800,400,20,20);
  rover.addAnimation("forward", roverForwardImg);
  rover.addAnimation("right", roverRightImg);
  rover.addAnimation("left", roverLeftImg);
  rover.scale = 0.5;

  fuelGroup = createGroup();
  screwGroup = createGroup();
}

function draw()
{
  background("grey");
  image(backgroundImg,0,-height*3,1600*2,800*4);
  drawSprites();
  if(rover.position.x >= 800 && rover.position.x <= 2404)
  {
    camera.position.x = rover.position.x;
  }
  if(rover.position.y <= 400 && rover.position.y >= -2014)
  {
    camera.position.y = rover.position.y;
  }
    
 
  if(gameState == "play")
  {
    setTimeout(() => {
      gameState = "win"
      rover.changeAnimation("forward");
      gameOver();
    }, 300000);
    if(fuelCount<0 || lifeCount<0)
    {
      gameState = "lose"
      rover.changeAnimation("forward");
      gameOver();
    }

    fuelCount -= 0.5;
    lifeCount -= 0.5;

    push();
    stroke("black");
    noFill();
    rect(camera.x-790,camera.y-390,200,20);
    rect(camera.x-790,camera.y-360,200,20);

    fill("red");
    rect(camera.x-790,camera.y-390,fuelCount,20);

    fill("grey");
    rect(camera.x-790,camera.y-360,lifeCount,20);
    pop();

    if(keyDown(DOWN_ARROW) && rover.position.y <= 730)
    {
      rover.changeAnimation("forward");
      rover.position.y += 15;
    }

    if(keyDown(UP_ARROW) && rover.position.y > -2345)
    {
      rover.changeAnimation("forward");
      rover.position.y -= 15;
    }

    if(keyDown(RIGHT_ARROW) && rover.position.x <= 3124)
    {
      rover.changeAnimation("right");
      rover.position.x += 15;
    }

    if(keyDown(LEFT_ARROW) && rover.position.x >= 76)
    {
      rover.changeAnimation("left");
      rover.position.x -= 15;
    }

    fuelSpawn();
    screwSpawn();
  }
  
}

function fuelSpawn()
{
  if(frameCount%10 == 0)
  {
    fuel = createSprite(Math.round(random(50,3150)), Math.round(random(-height*3+50,750)), 20, 20);
    fuel.addImage(fuelImg);
    fuel.scale = 0.3;
    setTimeout(() => {
      fuel.destroy();
    }, 5000);
    fuelGroup.add(fuel);
  }
  if(rover.isTouching(fuelGroup))
  {
    fuel.destroy();
    fuelCount = 200;
  }
}

function screwSpawn()
{
  if(frameCount%10 == 0)
  {
    screw = createSprite(Math.round(random(50,3150)), Math.round(random(-height*3+50,750)), 20, 20);
    screw.addImage(screwImg);
    screw.scale = 0.2;
    setTimeout(() => {
      screw.destroy();
    }, 5000);
    screwGroup.add(screw);
  }
  if(rover.overlap(screwGroup))
  {
    screw.destroy();
    lifeCount = 200;
  }

}

function gameOver()
{
  if(gameState === "win")
  {
    swal({
      title: `You won!`,
      text: "You've Survived!",
      confirmButtonText: "Ok"
    });
  }

  if(gameState === "lose")
  {
    swal({
      title: `You lost!`,
      text: "Game over!",
      confirmButtonText: "Ok"
    });
  }

}
