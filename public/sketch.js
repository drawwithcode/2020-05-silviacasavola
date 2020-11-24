let socket = io();
let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);
}


function preload() {
  img1 = loadImage('assets/img1.png');
  img2 = loadImage('assets/img2.png');
  img3 = loadImage('assets/img3.png');
  img4 = loadImage('assets/img4.png');
  img5 = loadImage('assets/img5.png');
  img6 = loadImage('assets/img6.png');
  img7 = loadImage('assets/img7.png');
  img8 = loadImage('assets/img8.png');
  img9 = loadImage('assets/img9.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  push();
  textSize(30);
  text("Prove you're not a robot. Circle all the traffic lights.", 50, 50);
  pop()


    //images
    imageMode(CENTER);
    image(img1, windowWidth/3, windowHeight/5, 210, 210);
    image(img2, windowWidth/3, windowHeight/3, 210, 210);
    image(img3, windowWidth/3, windowHeight/3, 210, 210);
    image(img4, windowWidth/2, windowHeight/2, 210, 210);
    image(img5, windowWidth/2, windowHeight/2, 210, 210);
    image(img6, windowWidth/2, windowHeight/2, 210, 210);
    image(img7, (windowWidth/3)*2, (windowHeight/3)*2, 210, 210);
    image(img8, (windowWidth/3)*2, (windowHeight/3)*2, 210, 210);
    image(img9, (windowWidth/3)*2, (windowHeight/3)*2, 210, 210);

}

function newConnection() {
  console.log("your id: " + socket.id);
}

function setColor(assignedColor){
  myColor = assignedColor;
}

function draw() {

  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };

  socket.emit("mouse", message)
}

function drawOtherMouse(data) {
  push();
  noStroke();
  fill(data.color);
  ellipse(data.x, data.y, 10);
  pop();
}

function mouseDragged() {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 10);
  pop();
}
