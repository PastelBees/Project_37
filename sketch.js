//Create variables here
var dogImg1, dogImg2
var dog, happyDog, sadDog, database, foodS, foodStock
var  fedTime, lastFed
var foodObj
var notPress, buttonPress

var gameState = "Hungry"
var readState, changeState
var bedroom, garden, washroom

var currentTime

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")

  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")

  
}

function setup() {
  database = firebase.database();

  createCanvas(425, 500);
  
  foodObj = new Food()

  dog = createSprite(240, 380)
  dog.addImage(dogImg1)
  dog.scale = .17

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

  readState=database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val()
  })

  

  

}
function draw() {  
background(46, 139, 87)


foodObj.display()



  drawSprites();

  
fedTime = database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val();
})

if(gameState!="Hungry"){
  dog.remove()
  
}else{
  dog.addImage(dogImg1)

}

currentTime=hour();
if(currentTime==lastFed+1){
  update("Playing");
  foodObj.garden();
}else if(currentTime==lastFed+4){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>lastFed+4 && currentTime<=lastFed+7){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry");
  foodObj.display();
}





  fill(255,255,254);
  textSize(15);
  
  if(lastFed>=12){
    text("Last Fed : "+lastFed%12 + " PM", 165, 30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 165, 30);
  }else if(lastFed<12){
    text("Last Fed : " + lastFed + " AM",165 ,30)
  }


  
 

}

function readStock(data){
  foodS = data.val();
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
 

  foodS = foodS-1
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}



function addFoods(){
  foodS = foodS+1;
  database.ref('/').update({
    Food:foodS
  })
}