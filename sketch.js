//Create variables here
var database ;
var dog;
var dogImage,washroom,bedroom,garden;
var happyDog;
var happydogImage;
var feed;
var foodStock;
var foodS;
var buttons;
var lastfeed,feedTime;
var foodObj;
var gameState = "Hungry";
function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
}

function setup() {
	createCanvas(1300, 600);

  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value",readStock);
 
  dog = createSprite(1000,300,10,10);
  dog.addImage(dogImage)
  dog.scale=0.2

  foodObj = new Food();

  feed = createButton("FEED TOMMY");
  feed.position(500,15);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(400,15);
  add.mousePressed(AddFood);

  //read game state from datbase
  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });
}

function draw() {  
  background(46, 139, 87);

  feedTime = database.ref("feedTime");
  feedTime.on("value",function(data){
    lastfeed = data.val();
  });

  if(foodS!==undefined){
    fill("black");
  textSize(25);
  text("food Available:" + foodS,100,100);
  
   foodObj.display();
  
   
    }
    
   fill (225,225,254);
   textSize(20);
   if(lastfeed >= 12){
     text("Last Feed : "+lastfeed%12 + "PM",50,50);
  }else if (lastfeed==0){
    text("Last Feed : 12 AM"+ lastfeed ,50,50);
  }else{
    text("Last Feed : "+ "AM",50,50)
  }

  currentTime = hour();
  if(currentTime == (lastfeed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime == (lastfeed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastfeed+2) && currentTime <+(lastfeed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  
  if(gameState !="Hungry"){
    feed.hide();
    add.hide();
    dog.remove();
  }else{
    feed.show();
    add.show();
    dog.addImage(dogImage);
  }

drawSprites();
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1 
  }
  database.ref('/').update(
    {
      food:x
    }
  )
}

function AddFood(){
  foodS++;
  database.ref("/").update({
    food:foodS
  })
}

function FeedDog(){
  dog.addImage(happydogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food : foodObj.getFoodStock(),
    feedTime:hour(),
    gameState : "Hungry"
  })
}

// function to update game state in database
function update(state){
  database.ref("/").update({
    gameState : state
  });
}

