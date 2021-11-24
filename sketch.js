const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, Score = 0;
var cobblestone, zombie1,zombie2;
var backgroundImg,platform;
var steve, slingshot;

var gameST = "launch";
var gameState = "onSling";

function preload() {
    if (hour()>=06 && hour()<=19){
        bg = "Sprites/bg.jpeg";
    }
    else{
        bg = "Sprites/bg2.jpg";  
    }
    backgroundImg = loadImage(bg);
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    cobblestone1 = new Cobblestone(700,320,70,70);
    cobblestone2 = new Cobblestone(920,320,70,70);
    zombie1 = new Zombie(810, 350);
    log1 = new Log(810,260,300, PI/2);

    cobblestone3 = new Cobblestone(700,240,70,70);
    cobblestone4 = new Cobblestone(920,240,70,70);
    zombie2 = new Zombie(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    cobblestone5 = new Cobblestone(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    steve = new Steve(200,50);

    slingshot = new SlingShot(steve.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    fill("yellow");
    textSize(30);
    text("Score: " + Score, 1000, 40);

    fill("red");
    textSize(20);
    text("Diego André", 1000, 60);

    cobblestone1.display();
    cobblestone2.display();
    ground.display();
    zombie1.display();
    zombie1.score();
    log1.display();

    cobblestone3.display();
    cobblestone4.display();
    zombie2.display();
    zombie2.score();
    log3.display();

    cobblestone5.display();
    log4.display();
    log5.display();

    steve.display();
    platform.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameST =="launch"){
        Matter.Body.setPosition(steve.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameST = "launched2";
}

function keyPressed(){
    if(keyCode === 32){
        steve.trajectory = [];
        Matter.Body.setPosition(steve.body, {x: 200, y: 50});
        slingshot.attach(steve.body);
    }
    gameST = "launch";
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    if (hour>=06 && hour<=19){
        bg = "Sprite/bg1.png";
    }
    else{
        bg = "Sprite/bg2.png";  
    }
    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}