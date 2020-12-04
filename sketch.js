//Create variables here

var dog, happyDog, database, foodS, foodStock;
var bedroom, garden, washroom;

function preload()
{
	//load images here
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite();
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);

    feed=createButton("feed the dog");
        feed.position(700, 95);
        feed.mousePressed(feedDog);

        addFood = createButton("Add Food");
        addFood.position(800, 95);
        addFood.mousePressed(addFood);
  }

  //read game state from database
  readState = database.ref('gameState');
  readState.on("value", function(data) {
    gameState = data.val();
  });
  
}


  function draw() {  
    background(46, 139, 87);

    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data) {
      lastFed = data.val();
    });

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("last feed : "+lastFed%12 + "PM", 350, 30);
    }else if(lastFed==0){
      text("last feed : 12 AM", 350, 30);
    }else{
      text("last feed : "+ lastFed + "AM", 350, 30)
    }


    if(gameState=! "hungry") {
      feed.hide();
      addFood.hide();
      dog.remove();
    }else{
      feed.show();
      addFood.hide();
      dog.addImage(sadDog);
    }
    drawSprites();
    //add styles here

}

function readStock(data) {
  foodS=data.value();
}

function writeStock(x) {
  database.ref('/').update({
    food:x
  })
}

function update(state) {
  database.ref('/').update({
    gameState:state
  });
}



