let socket = io();
let myColor = "white"

let dist = 220;
let margin_left = 100;
let margin_top = -20;
let size = 200;

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
  textSize(25);
  textFont(myFont)
  text("I am not a robot.", 45, 45);
  pop()

  checkbox = createCheckbox('', false);
  checkbox.position(270, 28);
  checkbox.style("transform", "scale(1.4)")
  checkbox.changed(proveit);
}

function newConnection() {
  console.log("your id: " + socket.id);
}

function setColor(assignedColor){
  myColor = assignedColor;
}

function proveit() {

  push();
  textSize(25);
  textFont(myFont)
  text("Prove it. Circle all the street lights.", windowWidth/2 - dist - size/2 + margin_left, 45);
  pop()

    //images
    imageMode(CENTER);
    image(img1, windowWidth/2 - dist + margin_left, windowHeight/4 + margin_top, size, size);
    image(img2, windowWidth/2 + margin_left, windowHeight/4 + margin_top, size, size);
    image(img3, windowWidth/2 + dist + margin_left, windowHeight/4 + margin_top, size, size);
    image(img4, windowWidth/2 - dist + margin_left, windowHeight/4 + dist + margin_top, size, size);
    image(img5, windowWidth/2 + margin_left, windowHeight/4 + dist + margin_top, size, size);
    image(img6, windowWidth/2 + dist + margin_left, windowHeight/4 + dist + margin_top, size, size);
    image(img7, windowWidth/2 - dist + margin_left, windowHeight/4 + dist*2 + margin_top, size, size);
    image(img8, windowWidth/2 + margin_left, windowHeight/4 + dist*2 + margin_top, size, size);
    image(img9, windowWidth/2 + dist + margin_left, windowHeight/4 + dist*2 + margin_top, size, size);
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

  if (mouseX > windowWidth/2 - dist - size/2 + margin_left && mouseX < windowWidth/2 + dist + size/2 + margin_left && mouseY > windowHeight/4 - size/2 + margin_top && mouseY < windowHeight/4 + dist*2 + size/2 + margin_top) {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 10);
  pop();
}
}
