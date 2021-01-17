//Create variables here
var dogImg,happydog,database,foodStock,dog,foodS;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg1.png");
  happydog=loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,400,20,20);
  dog.addImage(dogImg);
  dog.scale=0.12;

  database=firebase.database();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  text("Food Remaining :"+foodS,150,200);
  text("Note:Press up arrow key to feed Drago milk",60,40);
  console.log(foodS);

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
  x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({Food:x});
} 