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

  myFont = loadFont("assets/Whyte-Book.ttf")
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  push();
  textSize(30);
  textFont(myFont)
  text("I am not a robot.", 50, 50);
  pop()

  let dist = 220;

  checkbox = createCheckbox('', false);
  checkbox.position(50, 100);
  checkbox.size(20, 20);
  checkbox.changed(proveit);
}

function newConnection() {
  console.log("your id: " + socket.id);
}

function setColor(assignedColor){
  myColor = assignedColor;
}

function proveit() {
    //images
    imageMode(CENTER);
    image(img1, windowWidth/2 - dist, windowHeight/4, 200, 200);
    image(img2, windowWidth/2, windowHeight/4, 200, 200);
    image(img3, windowWidth/2 + dist, windowHeight/4, 200, 200);
    image(img4, windowWidth/2 - dist, windowHeight/4 + dist, 200, 200);
    image(img5, windowWidth/2, windowHeight/4 + dist, 200, 200);
    image(img6, windowWidth/2 + dist, windowHeight/4 + dist, 200, 200);
    image(img7, windowWidth/2 - dist, windowHeight/4 + dist*2, 200, 200);
    image(img8, windowWidth/2, windowHeight/4 + dist*2, 200, 200);
    image(img9, windowWidth/2 + dist, windowHeight/4 + dist*2, 200, 200);
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
  if (mouseX >= windowWidth/2 - 320 && mouseX <= windowWidth/2 + 320 && mouseY >= windowHeight/4-100 && mouseY <= windowHeight/4 + 540) {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 10);
  pop();
}
}
