var count = 0;
var myCapture;
var myVida;
var imageType = 0;
var timeTag
let angle = 0;

function setup() {
    createCanvas (windowWidth, windowHeight);// typical camera resolution
    background (0);
    myCapture = createCapture (VIDEO);
    myCapture.size (640, 480)
    myCapture.hide();//hide to hide the preview from the camers
    myVida = new Vida();// create new object based on the vida library
    myVida.imageFilterFeedback = 0.95;
    myVida.imageFilterThreshold = 0.5;//lower values - more sensitive system to define the brightness of the pixel
    myVida.progressiveBackgroundFlag = true; // by defalt it is true, so we need to define the other condition
    myVida.mirror = myVida.MIRROR_HORIZONTAL; //to give natural image, not flipped
    myVida.handleActiveZonesFlag = true; //variable to define zones in the image that may be trigerred
    myVida.addActiveZone(
            "zone1",
            0, 0, 0.3, 0.3,
            trigger

    );
    myVida.addActiveZone(
        "zone2",
        0.7, 0.1, 0.7, 0.1,
        trigger

    );

    myVida.addActiveZone(
        "zone3",
        0.1, 0.7, 0.1, 0.7,
        trigger

    );

    myVida.addActiveZone(
        "zone4",
        0.7, 0.7, 0.7, 0.7,
        trigger

    );
    frameRate (30);
    myGraphics = createGraphics (640, 480); //(320, 240);
    myGraphics.pixelDensity (1); // to get it the same as camera`s - its related to how many pix are treated as virtuel pix
    myGraphics.background (0, 0, 255);

    myCg = createGraphics (640, 480);
    myCg.pixelDensity (1);
    myCg.background (0, 0, 255);

    setInterval(saveImage, 100000)
}

function saveImage() {
  count++;
  save('image' + count + '.jpg');
}


function draw() {
    background (0);
    if (myCapture === null) return; //if there is no camera
    if (myCapture === undefined) return; // when camera is connected, but smth is not set yet
    if (!myCapture.width) return;// ! - is a sign that function does not exist, we use it in case we have no access to the camera for some reason
    myVida.update(myCapture)

    image(myVida.currentImage, width/4, height/6);

    //drawVidaImage();//turn it off to make Vida image appear the siza you have set in the myCapture.size

    //myVida.drawActiveZones (0, 0, width, height);
    push()
    image(get(),-1,-1, width+3, height+3)//отвечает за расползание картинки
    pop()


}

function captureFrame() {
    if (myCapture === null) return; //if there is no camera
    if (myCapture === undefined) return; // when camera is connected, but smth is not set yet
    if (!myCapture.width) return;
    //myVida.setBackgroundImage (myCapture);- not needed if myVida.progressiveBackgroundFlag is true
    myGraphics.image (myCapture, 0,0, myGraphics.width, myGraphics.height); // in brackets we define first the name of the image, then the position of the upper left corner, then the size
    myCg.image (myCapture, 0, 0, myCg.width, myCg.height);
    timeTag = millis ();// ?why firts timetag = 0 and here = millis?//millis returnes time from when the prog was started in miliseonds - at start = 0 and gets higher after


}

function trigger (_zone) { // adding _ before the parameter will help us quickly get in the code it is a parameter, not a global or other value
    console.log(
        _zone.id + " " + _zone.isMovementDetectedFlag //_zone.isMovementDetectedFlag will be tru if the zone is triggered or false if not triggered
    );
    //var time_blend = (millis() - timeTag) / 500.0;
    if(_zone.id === 'zone1'){
        captureFrame()    
        filter(INVERT);
        }
        if (_zone.isMovementDetectedFlag) {
            if(_zone.id === 'zone2'){
            push();
            blendMode(DARKEST); 
            pop();
            }
                if(_zone.id === 'zone3'){// how to make it shortly after the trigger is on? not forever
                    blendMode(LIGHTEST);
                }
                if(_zone.id === 'zone4'){// how to make it rotate constantly
                    push();
                        
                       angle = angle + 1;  
                       translate (200, 200);
                       rotate (angle); 
                       image(myVida.currentImage, width/4, height/6);
                   pop();   
                   }
            }

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {

        createCanvas (windowWidth, windowHeight);// typical camera resolution
    background (0);
    myCapture = createCapture (VIDEO);
    myCapture.size (640, 480)
    myCapture.hide();//hide to hide the preview from the camers
    myVida = new Vida();// create new object based on the vida library
    myVida.imageFilterFeedback = 0.95;
    myVida.imageFilterThreshold = 0.5;//lower values - more sensitive system to define the brightness of the pixel
    myVida.progressiveBackgroundFlag = true; // by defalt it is true, so we need to define the other condition
    myVida.mirror = myVida.MIRROR_HORIZONTAL; //to give natural image, not flipped
    myVida.handleActiveZonesFlag = true; //variable to define zones in the image that may be trigerred
    myVida.addActiveZone(
            "zone1",
            0, 0, 0.3, 0.3,
            trigger

    );
    myVida.addActiveZone(
        "zone2",
        0.7, 0.1, 0.7, 0.1,
        trigger

    );

    myVida.addActiveZone(
        "zone3",
        0.1, 0.7, 0.1, 0.7,
        trigger

    );

    myVida.addActiveZone(
        "zone4",
        0.7, 0.7, 0.7, 0.7,
        trigger

    );
    frameRate (30);
    myGraphics = createGraphics (640, 480); //(320, 240);
    myGraphics.pixelDensity (1); // to get it the same as camera`s - its related to how many pix are treated as virtuel pix
    myGraphics.background (0, 0, 255);

    myCg = createGraphics (640, 480);
    myCg.pixelDensity (1);
    myCg.background (0, 0, 255);

    } else if (keyCode === RIGHT_ARROW) {
        save('myCanvas.png');
    }
}


function drawVidaImage () {
    switch(imageType) {// is similar to if ... as, but we need only 1 parameter for this instruction
        // but several cases to define the paraneters we want to test
            case 0:
            image(myVida.currentImage, 0, 0, width, height);
            break;
            case 1:
            image (myVida.backgroundImage, 0, 0, width, height);
            break;
            case 2:
            image (myVida.differenceImage, 0, 0, width, height);
            break;
            case 3:
            image (myVida.thresholdImage, 0, 0, width, height);
            break;
        }
}
