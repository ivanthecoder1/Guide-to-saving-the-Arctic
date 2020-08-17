//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

        //VARIABLES
let jump = false; // are we jumping
let direction = 1; // force of gravity in the y direction
let velocity = 1; // speed of the player
let jumpPower = 16; // strength of player's jump
let fallingSpeed = 1; // equal to velocity
let minHeight = 00; // height of ground
let maxHeight = 0; // height of sky
let jumpCounter = 0; // keeps track of how much we are jumping
let jumpWatch=0; //how many times jump is true
let barrier; // stops character from falling through stuff
let state = 1;
let dy;
let iceS;
px = 150;
py = 50;
let gravity= 0.1;
let vy = 1.0;
let heart = 3;

let newIceB;
//let my =mouseY;
//let mx =mouseX;
        //SETUP

function preload() {
    // logo png
   // logo = loadImage();
   logo=loadImage('assets/Finished.png')
}

function setup() {
 const canvas=createCanvas(1000, 600);
   canvas.parent('gameImage');
    resetSketch();
    noStroke();
             
    }
function resetSketch(){
    iceT = new Group(); // top part
    iceB = new Group(); // bottom part
    iceD = new Group(); // portion of the ice that pushes the player down
    
    // for loop for platforms
    for(let i = 0; i < 6; i++) {
        let newIceT = createSprite(random(0, width), random(0, height));
        newIceT.addImage(loadImage('assets/iceF1.png'));
        newIceT.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceT.add(newIceT);
    }
    for(let i = 0; i < 6; i++) {
        let newIceB = createSprite(random(0, width), random(0, height));
        newIceB.addImage(loadImage('assets/iceF1.png'));
        newIceB.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceB.add(newIceB);
    }
    for(let i = 0; i < 12; i++) {
        let newIceD = createSprite(random(0, width), random(0, height));
        newIceD.addAnimation('normal','assets/iceF1.png')
        newIceD.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        //newIceD1.addAnimation('melty','assets/iceF1.png','assets/ice1.Png','assets/ice2.png','assets/ice3.png','assets/ice4.png','assets/ice5.png');
        iceD.add(newIceD);
       // iceD.add(newIceD1)=false;
    }
    ice = createSprite(150, 200);
    ice.addAnimation('normal','assets/iceF1.png');
    ice.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');

    // sprite creation
    bear = createSprite(400, 200,20,20);
    //compact way to add an image
    bear.addAnimation('forward','assets/bearX1.png','assets/bearX1.png','assets/bearY1.png','assets/bearY1.png');
    bear.addAnimation('normal','assets/bearX1.png');

    bear.addAnimation('left','assets/bearX.png');
    bear.addAnimation('backward','assets/bearX.png','assets/bearX.png','assets/bearY.png','assets/bearY.png');
    // ice sprite
   

    
    // ground sprite
    ground = createSprite(500, 850, 20, 20);
    ground.addImage(loadImage('assets/ground.png')); // replace with water 

    // baby cub sprite
    baby = createSprite(845, 208, 20, 20);

    baby.addImage(loadImage('assets/prime.png'));
    
    //next level sprite
    next=createSprite(985,278);
    next.addImage(loadImage('assets/next.png'));
   
    // heart sprites
    heart1 = createSprite(25, 25, 20, 20);
    heart1.addImage(loadImage('assets/heart.png'));
    heart2 = createSprite(75, 25, 20, 20);
    heart2.addImage(loadImage('assets/heart.png'));
    heart3 = createSprite(125, 25, 20, 20);
    heart3.addImage(loadImage('assets/heart.png'));

    // screen image
    loseScreen = loadImage('assets/lose.png');
    winScreen = loadImage('assets/dancing.gif');
    bg = loadImage('assets/background.png');

}
function respawn() {
    px = 150;
    py = 25;

}

                //DRAW
function draw() {
    //console.log(bear.collide(ice));
    // start screen
    console.log(state)
    function mouse() {
        background(255, 255, 255);
        ellipse(mouseX, mouseY, 5, 5); 
      var hello = mouseX + ", " +mouseY;
      text( hello, mouseX, mouseY);
    };
    function world(){
        if(state==3||state==6||state==8||state==10||state==12||state==14||state==16||state==18||state==20){
            baby.removed=true;
            baby.visible=false;
        }
        else if (state==22){
            baby.removed=false;
            baby.visible=true;
            next.removed=true;
        }
        else{
            baby.removed=true;
            baby.visible=false;
            next.removed=false;
        }
    };
    world();
    function iceP() {

        iceT[0].position.x=245;
        iceT[0].position.y=271;
        iceT[1].position.x=600;
        iceT[1].position.y=173;
        iceT[2].position.x=365;
        iceT[2].position.y=336;
        iceT[3].position.x=450;
        iceT[3].position.y=229;
        iceT[4].position.x=669;
        iceT[4].position.y=363;
        iceT[5].position.x=192;
        iceT[5].position.y=402;

        //top 
        iceD[6].position.x=245;
        iceD[6].position.y=281;
        iceD[7].position.x=600;
        iceD[7].position.y=183;
        iceD[8].position.x=365;
        iceD[8].position.y=346;
        iceD[9].position.x=450;
        iceD[9].position.y=239;
        iceD[10].position.x=669;
        iceD[10].position.y=373;
        iceD[11].position.x=192;
        iceD[11].position.y=412;

        iceB[0].position.x=281;
        iceB[0].position.y=156;
        iceB[1].position.x=892;
        iceB[1].position.y=119;
        iceB[2].position.x=739;
        iceB[2].position.y=198;
        iceB[3].position.x=488;
        iceB[3].position.y=382;
        iceB[4].position.x=988;
        iceB[4].position.y=297;
        iceB[5].position.x=846;
        iceB[5].position.y=246;

        //bottom
        iceD[0].position.x=281;
        iceD[0].position.y=166;
        iceD[1].position.x=892;
        iceD[1].position.y=129;
        iceD[2].position.x=739;
        iceD[2].position.y=208;
        iceD[3].position.x=488;
        iceD[3].position.y=392;
        iceD[4].position.x=988;
        iceD[4].position.y=307;
        iceD[5].position.x=846;
        iceD[5].position.y=256;
       

    }
    function bearP(){
        // position
        bear.position.x = px;
        bear.position.y = py;
        
        // controls
        if (keyIsDown(65)) {
            px -= 3;
        //image(rpolarBear,this.x,py,this.r);
        bear.changeImage('backward');
        }
        else{
          //  bear.changeImage('left')
        }
        //if(!(keyIsDown(65))){
           // bear.changeImage('left');
        // }
       
        if (keyIsDown(68)) {
            px += 3;
            bear.changeImage('forward');
        }
        else{
           //bear.changeImage('normal');
        }
       
        if (!(keyIsDown(68)||keyIsDown(65))){
            bear.changeImage('normal');
        }
            //bear.changeAnimation('normal');
       // }
        if (keyIsDown(87)) {
            jump = true;
            
        } 
        else {
            jump = false;
        } 
        if (keyIsDown(87) && bear.collide(ice)){
            jump=true;
            jumpWatch=0;
        }
        if(keyIsDown(87) && bear.collide(iceB)){
            jump = true;
            jumpWatch = 0;
        }
        if(keyIsDown(87) && bear.collide(iceT)){
            jump = true;
            jumpWatch = 0;
        }

        if(state==1||state==2||state==3||state==4||state==6||state==8||state==10||state==12||state==14||state==16||state==18||state==20||state==22){
            py+=4;
        }
       
        
        //console.log(jumpWatch);
    }
    function collision() {
        if(bear.collide(ice)){
            py -= barrier;
          //  ice.changeAnimation('melty')
        }
        if(bear.collide(ground)){
            py -= 6;
            heart -= 1;
            respawn();
            life();
            
        }
        if (bear.collide(next)) {
            state = 6;
            heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
             bear.visible=false;
        }
        if(bear.collide(iceT)){
          //  py -= barrier;
            //py+=6;
        }
        if(bear.collide(iceB)){
          //  py -= barrier;
            //py+=6;
        }
        // collision for iceD
        if (bear.collide(iceD)) {
           py += 20;
        }

        

        
    }  
    function jumpObserver(){
        // jumpWatch=0;
        
        if (jump == true){
            jumpWatch += 1;
        }


        if (jumpWatch>8){
            jump=false;
           // jumpWatch=0
        }
        for(let i=0; i<6; i++){
        if (bear.collide(iceB[i])){
           
            py= iceB[i].position.y-10;
           // py= 5+iceB.position.y
           // barrier= vy+fallingSpeed-1;
          // barrier = 1;
            }
        }
        for(let i=0;i<6;i++){
            if(bear.collide(iceT[i])){
         //  for()
                py= iceT[i].position.y-10;
           
            //barrier=vy+fallingSpeed-1;
           // barrier=1;
            }
        }
        if (bear.collide(ice)){
          
           py= ice.position.y-10;
            //barrier=vy+fallingSpeed-1;
          //  barrier=1;
        }
        

    }
    function life() {
        if (heart == 0) {
            heart1.visible = false;
            // respawn
            // state = losing state
            state = 4;
        }   
        else if (heart == 2) {
            heart3.visible = false;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
            resetIce()
        }
        else if (heart == 1) {
            heart2.visible = false;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
            resetIce();
        }
    }
    function respawn() {
        px = 150;
        py = 25;

    }
    function gravity() {
        vy += gravity;
        bear.position.y += vy;
        vy = constrain(vy,1,3.9);
            if (py >= minHeight && jump == false){
                // stop falling on the ground
                py = py;
                jumpCounter = 0;
                
            } 
            else {
                py = py + (direction*velocity); // code that makes gravity work
                
            }
    
            if (jump == true) {
                if(py <= maxHeight || jumpCounter >= jumpPower) {
                    if (py >= minHeight) {
                        //py = minHeight;
                    }
                    else {
                        velocity = fallingSpeed;
                    }
                    velocity = fallingSpeed; // falls at max
                }
                else{
                    velocity = -jumpPower;
                    jumpCounter = jumpCounter + 1; // add to jump coutner
                }
            } // close jump
            else{
                velocity = fallingSpeed;
            }
    }
    function meltingIce(){  
            // if(py==ice.position.y-10){
            //     ice.changeImage('melty')
            //    ice.animation.frameDelay=20;
            // }
           
            // if(ice.animation.getFrame()===11){
            //     ice.removed=true;
            //     ice.position.x=5000;
            //     ice.position.y=5000;
             
            // }
            if(state==4 &&(ice.removed=true)){
                ice.changeImage('normal')
                //ice.removed=false;
                //ice.position.x=150;
               // ice.position.y=200;
               
            }
            
                 for(let i= 0; i<6; i++){
              if (py==iceT[i].position.y-10&&px>iceT[i].position.x-50&&px<iceT[i].position.x+50){
                  iceT[i].changeAnimation('melty');
                  iceT[i].animation.frameDelay=20;
              }
              if(iceT[i].animation.getFrame()===11){ 
                  iceT[i].animation.stop();
                  iceT[i].removed=true;
                  iceT[i].position.x=5000;
                  iceT[i].position.y=5000;
                 // iceT[i].changeAnimation('normal');
              }
              if(state==4){
                iceT[i].changeAnimation('normal');
              
              }
              
             }
             for(let i=0; i<6;i++){
             if (py==iceB[i].position.y-10&&px>iceB[i].position.x-50&&px<iceB[i].position.x+50){
                     iceB[i].changeAnimation('melty');
                     iceB[i].animation.frameDelay=20;
             }
                if(iceB[i].animation.getFrame()===11){    
                   // iceB[i].animation.stop();
                  iceB[i].removed=true;
                  iceB[i].position.x=5000;
                  iceB[i].position.y=5000;
                //  iceB[i].changeAnimation('normal');
                }
                if(state==4){
                    iceB[i].changeAnimation('normal');
                             }
            }
        
             for(let i=0; i<12; i++){
                 if (py==iceD[i].position.y-20&&px>iceD[i].position.x-50&&px<iceD[i].position.x+50){
                    iceD[i].changeImage('melty');
                    iceD[i].animation.frameDelay=20;
                 }
                if(iceD[i].animation.getFrame()===11){  
                  //  iceD[i].animation.stop();  
                    iceD[i].removed=true;
                    iceD[i].position.x=5000;
                    iceD[i].position.y=5000;
                 //   iceD[i].changeImage('normal');
                }
              
                if(state==4){
                    iceD[i].changeImage('normal');
               
                 
                }
                
             }
          //  console.log(ice.removed);
    }
    function debug(){
        bear.debug = false// mouseIsPressed;
        ice.debug = false//mouseIsPressed;
        for(let i=0; i<6; i++){
        iceT[i].debug = true//mouseIsPressed;
        }
        for(let i=0; i<6; i++){
          iceB[i].debug = false//mouseIsPressed;
          }
          for(let i=0; i<12; i++){
              iceD[i].debug = false//mouseIsPressed;
                      }
        next.debug=true;
      }
 //text('hmm',mouseX,mouseY);
    if (state == 1) {
      
        background(bg);
        textFont('Georgia');
        image(logo,420,150,175,100);
        textSize(15)
        text('AN',500,140)
        text('PRODUCTION',460,260);
            //background();
        // title button
        textSize(50);
        fill('blue');
        text('Polar Meltdown', 325, 100);
        // play button - go to state 3
        fill('red');
        rect(380, 300, 250, 75, 40);
        fill('black');
        text('PLAY', 440, 350);
        // how to play button - go to help state 
        fill('blue');
        rect(380, 420, 250, 75, 40);
        textSize(30);
        fill('black');
        text('HOW TO PLAY', 410, 470);
        // excursion button
       // image(logo, 400, 500, 50, 25, 40);   
    }
    // how to play
    if (state == 2) {
        background(bg);
        fill(0, 50, 255);
        textSize(35);
        textFont('Georgia');
        fill('black');
        text("YOUR OBJECTIVE IS TO GET TO YOUR", 185, 150);
        text("LOST CUB WHILE JUMPING ON ICE PLATFORMS ", 95, 220);
        text("BE CAREFUL FOR THE ICE MELTS BENEATH YOUR FEET", 20, 280)
        text("W = JUMP, A/D = LEFT/RIGHT", 250, 350);
        fill('blue');
        rect(200,500,250,75,40);
        fill('black');
        text('PLAY', 280, 550)
        fill('white');
        rect(550,500,250,75,40);
        fill('black');
        text('BACK',630,550);
    }
    // test stage
    if (state == 3) {
    fill(0, 0, 25);
    background(bg);
    fill(255,255,255);
    rect(862,18,100,50,20);
    fill(0)
    textSize(35);
    textFont('Georgia');
    text('EXIT',870,55);
    textSize(50)
    textFont('Georgia');
    text('Level: 1',300,55);

    fill(255,255,255);
    rect(578,18,180,50,20);
    fill(0)
    textSize(30);
    text('Level Select',590,55)
   
   
   // image(backScreen,0,0,1000,600);
    gravity();
       
    
      //console.log(ice.animation.getFrame());
  
    
    // bear.stop();
    // player
    bearP();
    jumpObserver();
    collision();
    // health system
    // respawn location 
    // ice platforms
    iceP();
    //ice.animation('normal');
    meltingIce();  
  //if debug is set to true bounding boxes, centers and depths are visualized
  
//debug();
 // iceB[i].debug = true//mouseIsPressed
 // ground.debug = true// mouseIsPressed;
        debug();
 
  drawSprites();    
    }
    // lose state
    if(state == 4) {
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(87)||keyIsDown(83)) {
            state = 3;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }
    }   
     if(state == 5) {
        background(winScreen);
        fill(0, 120, 255);
        textSize(60);
        text('You WIN!', 350, 100);
        textSize(20);
        text("Press S or W to play again!", 380, 200); 
        if (keyIsDown(83)||keyIsDown(87)) {
            state = 1;
            // reset hearts back to 3

            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
        }  
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state ==6){
        bear.visible=true;
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 2',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
  // px==150;
  // py==180;
        gravity();
      
   bearP();
   jumpObserver();
   
   collision1();
   function collision1() {
       if(bear.collide(ice)){
           py -= barrier;
         //  ice.changeAnimation('melty')
       }
       if(bear.collide(ground)){
           py -= 6;
           heart -= 1;
           respawn();
           life1();
           
       }
       if (bear.collide(next)) {
           state = 8;
           heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
       }
       if(bear.collide(iceT)){
         //  py -= barrier;
           //py+=6;
       }
       if(bear.collide(iceB)){
         //  py -= barrier;
           //py+=6;
       }
       // collision for iceD
       if (bear.collide(iceD)) {
          py += 20;
       }

       

       
   }
   function life1() {
       if (heart == 0) {
           heart1.visible = false;
           // respawn
           // state = losing state
           state = 7;
       }   
       else if (heart == 2) {
           heart3.visible = false;
           for(let i=0; i<6; i++){
               iceT[i].removed = true//mouseIsPressed;
               }
               for(let i=0; i<6; i++){
                 iceB[i].removed = true//mouseIsPressed;
                 }
                 for(let i=0; i<12; i++){
                     iceD[i].removed = true//mouseIsPressed;
                 }
           resetIce()
       }
       else if (heart == 1) {
           heart2.visible = false;
           for(let i=0; i<6; i++){
               iceT[i].removed = true//mouseIsPressed;
               }
               for(let i=0; i<6; i++){
                 iceB[i].removed = true//mouseIsPressed;
                 }
                 for(let i=0; i<12; i++){
                     iceD[i].removed = true//mouseIsPressed;
                 }
           resetIce();
       }
   }
   function iceP1() {

       iceT[0].position.x=221;
       iceT[0].position.y=361;
       iceT[1].position.x=691;
       iceT[1].position.y=290;
       iceT[2].position.x=308;
       iceT[2].position.y=198;
       iceT[3].position.x=885;
       iceT[3].position.y=379;
       iceT[4].position.x=422;
       iceT[4].position.y=117;
       iceT[5].position.x=808;
       iceT[5].position.y=252;

       //top 
       iceD[6].position.x=221;
       iceD[6].position.y=371;
       iceD[7].position.x=691;
       iceD[7].position.y=300;
       iceD[8].position.x=308;
       iceD[8].position.y=208;
       iceD[9].position.x=885;
       iceD[9].position.y=389;
       iceD[10].position.x=422;
       iceD[10].position.y=127;
       iceD[11].position.x=808;
       iceD[11].position.y=262;

       iceB[0].position.x=375;
       iceB[0].position.y=426;
       iceB[1].position.x=546;
       iceB[1].position.y=336;
       iceB[2].position.x=874;
       iceB[2].position.y=152;
       iceB[3].position.x=674;
       iceB[3].position.y=137;
       iceB[4].position.x=334;
       iceB[4].position.y=288;
       iceB[5].position.x=534;
       iceB[5].position.y=206;

       //bottom
       iceD[0].position.x=375;
       iceD[0].position.y=436;
       iceD[1].position.x=546;
       iceD[1].position.y=346;
       iceD[2].position.x=874;
       iceD[2].position.y=162;
       iceD[3].position.x=674;
       iceD[3].position.y=147;
       iceD[4].position.x=334;
       iceD[4].position.y=298;
       iceD[5].position.x=534;
       iceD[5].position.y=216;
      

   }
   next.position.x=886;
   next.position.y=363;
//   mouse();
   iceP1();
  // debug();
   meltingIce();  
   drawSprites();    
   // }
}
    if(state==7){
       background(loseScreen);
       fill(0, 120, 255);
       textSize(60);
       text('GAMEOVER!', 320, 100);
       textSize(25);
       text("Don't give up! Press S or W to retry!", 300, 200)    
       
       iceP();
   
       ice.position.x=150;
       ice.position.y=200;
  //    ice.animation.looping=true;
       //ice.removed=false;
        
        
        if (keyIsDown(87)||keyIsDown(83)) {
           state = 6;
           for(let i=0; i<6; i++){
               iceT[i].removed = true//mouseIsPressed;
               }
               for(let i=0; i<6; i++){
                 iceB[i].removed = true//mouseIsPressed;
                 }
                 for(let i=0; i<12; i++){
                     iceD[i].removed = true//mouseIsPressed;
                 }
      
           // reset hearts back to 3
           heart = 3;
           heart1.visible = true;
           heart2.visible = true;
           heart3.visible = true;
           
           resetIce();
           
           //state = 3;
           
           
       }  
    }
    if(state==8){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 3',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
     gravity();
   
    bearP();
    jumpObserver();

    collision2();
    function collision2() {
    if(bear.collide(ice)){
        py -= barrier;
      //  ice.changeAnimation('melty')
    }
    if(bear.collide(ground)){
        py -= 6;
        heart -= 1;
        respawn();
        life2();
        
    }
    if (bear.collide(next)) {
        state = 10;
        heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
    }
    if(bear.collide(iceT)){
      //  py -= barrier;
        //py+=6;
    }
    if(bear.collide(iceB)){
      //  py -= barrier;
        //py+=6;
    }
    // collision for iceD
    if (bear.collide(iceD)) {
       py += 20;
    }

    

    
}
    function life2() {
    if (heart == 0) {
        heart1.visible = false;
        // respawn
        // state = losing state
        state = 9;
    }   
    else if (heart == 2) {
        heart3.visible = false;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce()
    }
    else if (heart == 1) {
        heart2.visible = false;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
    }
}
    function iceP2() {

    iceT[0].position.x=562;
    iceT[0].position.y=261;
    iceT[1].position.x=357;
    iceT[1].position.y=205;
    iceT[2].position.x=376;
    iceT[2].position.y=281;
    iceT[3].position.x=210;
    iceT[3].position.y=528;
    iceT[4].position.x=856;
    iceT[4].position.y=442;
    iceT[5].position.x=296;
    iceT[5].position.y=440;

    //top 
    iceD[6].position.x=562;
    iceD[6].position.y=271;
    iceD[7].position.x=357;
    iceD[7].position.y=215;
    iceD[8].position.x=376;
    iceD[8].position.y=291;
    iceD[9].position.x=210;
    iceD[9].position.y=538;
    iceD[10].position.x=856;
    iceD[10].position.y=452;
    iceD[11].position.x=296;
    iceD[11].position.y=450;

    iceB[0].position.x=950;
    iceB[0].position.y=434;
    iceB[1].position.x=251;
    iceB[1].position.y=319;
    iceB[2].position.x=773;
    iceB[2].position.y=200;
    iceB[3].position.x=888;
    iceB[3].position.y=536;
    iceB[4].position.x=286;
    iceB[4].position.y=529;
    iceB[5].position.x=541;
    iceB[5].position.y=424;

    //bottom
    iceD[0].position.x=950;
    iceD[0].position.y=444;
    iceD[1].position.x=251;
    iceD[1].position.y=329;
    iceD[2].position.x=773;
    iceD[2].position.y=210;
    iceD[3].position.x=888;
    iceD[3].position.y=546;
    iceD[4].position.x=286;
    iceD[4].position.y=539;
    iceD[5].position.x=541;
    iceD[5].position.y=434;
   

}
next.position.x;
next.position.y;
    iceP2();
    meltingIce();  
    drawSprites();    
// }  
}
    if(state==9){
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
    
    iceP();

    ice.position.x=150;
    ice.position.y=200;
//    ice.animation.looping=true;
    //ice.removed=false;
     
     
     if (keyIsDown(87)||keyIsDown(83)) {
        state = 8;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
   
        // reset hearts back to 3
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        
        resetIce();
        
        //state = 3;
}        
        
}
    if(state==10){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 4',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
        gravity();
  
        bearP();
        jumpObserver();

    collision3();
    function collision3() {
   if(bear.collide(ice)){
       py -= barrier;
     //  ice.changeAnimation('melty')
   }
   if(bear.collide(ground)){
       py -= 6;
       heart -= 1;
       respawn();
       life3();
       
   }
   if (bear.collide(next)) {
       state = 12;
       heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
   }
   if(bear.collide(iceT)){
     //  py -= barrier;
       //py+=6;
   }
   if(bear.collide(iceB)){
     //  py -= barrier;
       //py+=6;
   }
   // collision for iceD
   if (bear.collide(iceD)) {
      py += 20;
   }

   

   
}
    function life3() {
   if (heart == 0) {
       heart1.visible = false;
       // respawn
       // state = losing state
       state = 11;
   }   
   else if (heart == 2) {
       heart3.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce()
   }
   else if (heart == 1) {
       heart2.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce();
   }
}
    function iceP3() {

    iceT[0].position.x=486;
    iceT[0].position.y=394;
    iceT[1].position.x=427;
    iceT[1].position.y=393;
    iceT[2].position.x=516;
    iceT[2].position.y=492;
    iceT[3].position.x=862;
    iceT[3].position.y=521;
    iceT[4].position.x=805;
    iceT[4].position.y=282;
    iceT[5].position.x=889;
    iceT[5].position.y=360;

    //top 
    iceD[6].position.x=486;
    iceD[6].position.y=404;
    iceD[7].position.x=427;
    iceD[7].position.y=403;
    iceD[8].position.x=516;
    iceD[8].position.y=502;
    iceD[9].position.x=862;
    iceD[9].position.y=531;
    iceD[10].position.x=805;
    iceD[10].position.y=292;
    iceD[11].position.x=889;
    iceD[11].position.y=370;

    iceB[0].position.x=282;
    iceB[0].position.y=298;
    iceB[1].position.x=330;
    iceB[1].position.y=228;
    iceB[2].position.x=766;
    iceB[2].position.y=329;
    iceB[3].position.x=481;
    iceB[3].position.y=249;
    iceB[4].position.x=684;
    iceB[4].position.y=423;
    iceB[5].position.x=713;
    iceB[5].position.y=306;

    //bottom
    iceD[0].position.x=282;
    iceD[0].position.y=308;
    iceD[1].position.x=330;
    iceD[1].position.y=238;
    iceD[2].position.x=766;
    iceD[2].position.y=339;
    iceD[3].position.x=481;
    iceD[3].position.y=259;
    iceD[4].position.x=684;
    iceD[4].position.y=433;
    iceD[5].position.x=713;
    iceD[5].position.y=316;
    

}
next.position.x;
next.position.y;
iceP3();
meltingIce();  
drawSprites();    
// }
}
    if(state==11){
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
    
        iceP();

        ice.position.x=150;
        ice.position.y=200;
//    ice.animation.looping=true;
    //ice.removed=false;
     
     
     if (keyIsDown(87)||keyIsDown(83)) {
        state = 10;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
   
        // reset hearts back to 3
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        
        resetIce();
        
        //state = 3;
    }
}
    if(state==12){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 5',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
        gravity();
  
        bearP();
        jumpObserver();

    collision4();
    function collision4() {
   if(bear.collide(ice)){
       py -= barrier;
     //  ice.changeAnimation('melty')
   }
   if(bear.collide(ground)){
       py -= 6;
       heart -= 1;
       respawn();
       life4();
       
   }
   if (bear.collide(next)) {
       state = 14;
       heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
   }
   if(bear.collide(iceT)){
     //  py -= barrier;
       //py+=6;
   }
   if(bear.collide(iceB)){
     //  py -= barrier;
       //py+=6;
   }
   // collision for iceD
   if (bear.collide(iceD)) {
      py += 20;
   }

   

   
}
    function life4() {
   if (heart == 0) {
       heart1.visible = false;
       // respawn
       // state = losing state
       state = 13;
   }   
   else if (heart == 2) {
       heart3.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce()
   }
   else if (heart == 1) {
       heart2.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce();
   }
}
    function iceP4() {

    iceT[0].position.x=815;
    iceT[0].position.y=466;
    iceT[1].position.x=856;
    iceT[1].position.y=245;
    iceT[2].position.x=623;
    iceT[2].position.y=507;
    iceT[3].position.x=450;
    iceT[3].position.y=260;
    iceT[4].position.x=369;
    iceT[4].position.y=316;
    iceT[5].position.x=719;
    iceT[5].position.y=542;

    //top 
    iceD[6].position.x=815;
    iceD[6].position.y=476;
    iceD[7].position.x=856;
    iceD[7].position.y=255;
    iceD[8].position.x=623;
    iceD[8].position.y=517;
    iceD[9].position.x=450;
    iceD[9].position.y=270;
    iceD[10].position.x=369;
    iceD[10].position.y=326;
    iceD[11].position.x=719;
    iceD[11].position.y=552;

    iceB[0].position.x=877;
    iceB[0].position.y=301;
    iceB[1].position.x=491;
    iceB[1].position.y=345;
    iceB[2].position.x=752;
    iceB[2].position.y=371;
    iceB[3].position.x=515;
    iceB[3].position.y=546;
    iceB[4].position.x=678;
    iceB[4].position.y=444;
    iceB[5].position.x=424;
    iceB[5].position.y=349;

    //bottom
    iceD[0].position.x=877;
    iceD[0].position.y=311;
    iceD[1].position.x=491;
    iceD[1].position.y=355;
    iceD[2].position.x=752;
    iceD[2].position.y=381;
    iceD[3].position.x=515;
    iceD[3].position.y=556;
    iceD[4].position.x=678;
    iceD[4].position.y=454;
    iceD[5].position.x=424;
    iceD[5].position.y=359;
    

}
next.position.x;
next.position.y;
iceP4();
meltingIce();  
drawSprites();    
// }
}
    if(state==13){
     background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(87)||keyIsDown(83)) {
            state = 12;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }    
}
    if(state==14){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 6',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
        gravity();
  
        bearP();
        jumpObserver();

    collision5();
    function collision5() {
   if(bear.collide(ice)){
       py -= barrier;
     //  ice.changeAnimation('melty')
   }
   if(bear.collide(ground)){
       py -= 6;
       heart -= 1;
       respawn();
       life5();
       
   }
   if (bear.collide(next)) {
       state = 16;
       heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
   }
   if(bear.collide(iceT)){
     //  py -= barrier;
       //py+=6;
   }
   if(bear.collide(iceB)){
     //  py -= barrier;
       //py+=6;
   }
   // collision for iceD
   if (bear.collide(iceD)) {
      py += 20;
   }

   

   
}
    function life5() {
   if (heart == 0) {
       heart1.visible = false;
       // respawn
       // state = losing state
       state = 15;
   }   
   else if (heart == 2) {
       heart3.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce()
   }
   else if (heart == 1) {
       heart2.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce();
   }
}
    function iceP5() {

    iceT[0].position.x=250;
    iceT[0].position.y=550;
    iceT[1].position.x=458;
    iceT[1].position.y=435;
    iceT[2].position.x=446;
    iceT[2].position.y=511;
    iceT[3].position.x=884;
    iceT[3].position.y=290;
    iceT[4].position.x=460;
    iceT[4].position.y=529;
    iceT[5].position.x=347;
    iceT[5].position.y=273;

    //top 
    iceD[6].position.x=250;
    iceD[6].position.y=560;
    iceD[7].position.x=458;
    iceD[7].position.y=445;
    iceD[8].position.x=446;
    iceD[8].position.y=521;
    iceD[9].position.x=884;
    iceD[9].position.y=300;
    iceD[10].position.x=460;
    iceD[10].position.y=539;
    iceD[11].position.x=347;
    iceD[11].position.y=283;

    iceB[0].position.x=609;
    iceB[0].position.y=449;
    iceB[1].position.x=671;
    iceB[1].position.y=491;
    iceB[2].position.x=373;
    iceB[2].position.y=379;
    iceB[3].position.x=832;
    iceB[3].position.y=246;
    iceB[4].position.x=613;
    iceB[4].position.y=517;
    iceB[5].position.x=534;
    iceB[5].position.y=382;

    //bottom
    iceD[0].position.x=609;
    iceD[0].position.y=459;
    iceD[1].position.x=671;
    iceD[1].position.y=501;
    iceD[2].position.x=373;
    iceD[2].position.y=389;
    iceD[3].position.x=832;
    iceD[3].position.y=256;
    iceD[4].position.x=613;
    iceD[4].position.y=527;
    iceD[5].position.x=534;
    iceD[5].position.y=392;

    

}
next.position.x;
next.position.y;
iceP5();
meltingIce();  
drawSprites();    
// }    
}
    if(state==15){
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(87)||keyIsDown(83)) {
            state = 14;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }   
}
    if(state==16){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 7',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
        gravity();
  
        bearP();
        jumpObserver();

    collision6();
    function collision6() {
   if(bear.collide(ice)){
       py -= barrier;
     //  ice.changeAnimation('melty')
   }
   if(bear.collide(ground)){
       py -= 6;
       heart -= 1;
       respawn();
       life6();
       
   }
   if (bear.collide(next)) {
       state = 18;
       heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
   }
   if(bear.collide(iceT)){
     //  py -= barrier;
       //py+=6;
   }
   if(bear.collide(iceB)){
     //  py -= barrier;
       //py+=6;
   }
   // collision for iceD
   if (bear.collide(iceD)) {
      py += 20;
   }

   

   
}
    function life6() {
   if (heart == 0) {
       heart1.visible = false;
       // respawn
       // state = losing state
       state = 17;
   }   
   else if (heart == 2) {
       heart3.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce()
   }
   else if (heart == 1) {
       heart2.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce();
   }
}
    function iceP6() {

    iceT[0].position.x=575;
    iceT[0].position.y=258;
    iceT[1].position.x=647;
    iceT[1].position.y=472;
    iceT[2].position.x=287;
    iceT[2].position.y=267;
    iceT[3].position.x=338;
    iceT[3].position.y=386;
    iceT[4].position.x=400;
    iceT[4].position.y=543;
    iceT[5].position.x=837;
    iceT[5].position.y=273;

    //top 
    iceD[6].position.x=575;
    iceD[6].position.y=268;
    iceD[7].position.x=647;
    iceD[7].position.y=482;
    iceD[8].position.x=287;
    iceD[8].position.y=277;
    iceD[9].position.x=338;
    iceD[9].position.y=396;
    iceD[10].position.x=400;
    iceD[10].position.y=553;
    iceD[11].position.x=837;
    iceD[11].position.y=283;

    iceB[0].position.x=893;
    iceB[0].position.y=218;
    iceB[1].position.x=418;
    iceB[1].position.y=476;
    iceB[2].position.x=420;
    iceB[2].position.y=232;
    iceB[3].position.x=525;
    iceB[3].position.y=386;
    iceB[4].position.x=585;
    iceB[4].position.y=291;
    iceB[5].position.x=861;
    iceB[5].position.y=209;

    //bottom
    iceD[0].position.x=893;
    iceD[0].position.y=228;
    iceD[1].position.x=418;
    iceD[1].position.y=486;
    iceD[2].position.x=420;
    iceD[2].position.y=242;
    iceD[3].position.x=525;
    iceD[3].position.y=396;
    iceD[4].position.x=585;
    iceD[4].position.y=301;
    iceD[5].position.x=861;
    iceD[5].position.y=219;
    

}
next.position.x;
next.position.y;
iceP6();
meltingIce();  
drawSprites();    
// }     
}
    if(state==17){
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(87)||keyIsDown(83)) {
            state = 16;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }  
}
    if(state==18){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 8',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
        gravity();
  
        bearP();
        jumpObserver();

    collision7();
    function collision7() {
   if(bear.collide(ice)){
       py -= barrier;
     //  ice.changeAnimation('melty')
   }
   if(bear.collide(ground)){
       py -= 6;
       heart -= 1;
       respawn();
       life7();
       
   }
   if (bear.collide(next)) {
       state = 20;
       heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
   }
   if(bear.collide(iceT)){
     //  py -= barrier;
       //py+=6;
   }
   if(bear.collide(iceB)){
     //  py -= barrier;
       //py+=6;
   }
   // collision for iceD
   if (bear.collide(iceD)) {
      py += 20;
   }

   

   
}
    function life7() {
   if (heart == 0) {
       heart1.visible = false;
       // respawn
       // state = losing state
       state = 19;
   }   
   else if (heart == 2) {
       heart3.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce()
   }
   else if (heart == 1) {
       heart2.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce();
   }
}
    function iceP7() {

    iceT[0].position.x=643;
    iceT[0].position.y=266;
    iceT[1].position.x=823;
    iceT[1].position.y=404;
    iceT[2].position.x=844;
    iceT[2].position.y=385;
    iceT[3].position.x=771;
    iceT[3].position.y=295;
    iceT[4].position.x=525;
    iceT[4].position.y=526;
    iceT[5].position.x=610;
    iceT[5].position.y=444;

    //top 
    iceD[6].position.x=643;
    iceD[6].position.y=276;
    iceD[7].position.x=823;
    iceD[7].position.y=414;
    iceD[8].position.x=844;
    iceD[8].position.y=395;
    iceD[9].position.x=771;
    iceD[9].position.y=305;
    iceD[10].position.x=525;
    iceD[10].position.y=536;
    iceD[11].position.x=610;
    iceD[11].position.y=454;

    iceB[0].position.x=840;
    iceB[0].position.y=494;
    iceB[1].position.x=638;
    iceB[1].position.y=275;
    iceB[2].position.x=272;
    iceB[2].position.y=246;
    iceB[3].position.x=722;
    iceB[3].position.y=496;
    iceB[4].position.x=939;
    iceB[4].position.y=501;
    iceB[5].position.x=307;
    iceB[5].position.y=243;

    //bottom
    iceD[0].position.x=840;
    iceD[0].position.y=504;
    iceD[1].position.x=638;
    iceD[1].position.y=285;
    iceD[2].position.x=272;
    iceD[2].position.y=256;
    iceD[3].position.x=722;
    iceD[3].position.y=506;
    iceD[4].position.x=939;
    iceD[4].position.y=511;
    iceD[5].position.x=307;
    iceD[5].position.y=253;
    

}
next.position.x;
next.position.y;
iceP7();
meltingIce();  
drawSprites();    
// }       
}
    if(state==19){
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(87)||keyIsDown(83)) {
            state = 18;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }  
}
    if(state==20){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 9',300,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
        gravity();
  
        bearP();
        jumpObserver();

    collision8();
    function collision8() {
   if(bear.collide(ice)){
       py -= barrier;
     //  ice.changeAnimation('melty')
   }
   if(bear.collide(ground)){
       py -= 6;
       heart -= 1;
       respawn();
       life8();
       
   }
   if (bear.collide(next)) {
       state = 22;
       heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=150;
             py=25;
   }
   if(bear.collide(iceT)){
     //  py -= barrier;
       //py+=6;
   }
   if(bear.collide(iceB)){
     //  py -= barrier;
       //py+=6;
   }
   // collision for iceD
   if (bear.collide(iceD)) {
      py += 20;
   }

   

   
}
    function life8() {
   if (heart == 0) {
       heart1.visible = false;
       // respawn
       // state = losing state
       state = 21;
   }   
   else if (heart == 2) {
       heart3.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce()
   }
   else if (heart == 1) {
       heart2.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce();
   }
}
    function iceP8() {

    iceT[0].position.x=447;
    iceT[0].position.y=342;
    iceT[1].position.x=803;
    iceT[1].position.y=520;
    iceT[2].position.x=277;
    iceT[2].position.y=224;
    iceT[3].position.x=509;
    iceT[3].position.y=403;
    iceT[4].position.x=946;
    iceT[4].position.y=374;
    iceT[5].position.x=331;
    iceT[5].position.y=544;

    //top 
    iceD[6].position.x=447;
    iceD[6].position.y=352;
    iceD[7].position.x=803;
    iceD[7].position.y=530;
    iceD[8].position.x=277;
    iceD[8].position.y=234;
    iceD[9].position.x=509;
    iceD[9].position.y=413;
    iceD[10].position.x=946;
    iceD[10].position.y=384;
    iceD[11].position.x=331;
    iceD[11].position.y=554;

    iceB[0].position.x=629;
    iceB[0].position.y=237;
    iceB[1].position.x=939;
    iceB[1].position.y=252;
    iceB[2].position.x=433;
    iceB[2].position.y=549;
    iceB[3].position.x=674;
    iceB[3].position.y=449;
    iceB[4].position.x=478;
    iceB[4].position.y=221;
    iceB[5].position.x=492;
    iceB[5].position.y=523;

    //bottom
    iceD[0].position.x=629;
    iceD[0].position.y=247;
    iceD[1].position.x=939;
    iceD[1].position.y=262;
    iceD[2].position.x=433;
    iceD[2].position.y=559;
    iceD[3].position.x=674;
    iceD[3].position.y=459;
    iceD[4].position.x=478;
    iceD[4].position.y=231;
    iceD[5].position.x=492;
    iceD[5].position.y=533;
    

}
next.position.x;
next.position.y;
iceP8();
meltingIce();  
drawSprites();    
// }           
}
    if(state==21){
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(87)||keyIsDown(83)) {
            state = 20;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }   
}
    if(state==22){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('Level: 10',290,55);
    
        fill(255,255,255);
        rect(578,18,180,50,20);
        fill(0)
        textSize(30);
        text('Level Select',590,55)
// px==150;
// py==180;
        gravity();
  
        bearP();
        jumpObserver();

    collision9();
    function collision9() {
   if(bear.collide(ice)){
       py -= barrier;
     //  ice.changeAnimation('melty')
   }
   if(bear.collide(ground)){
       py -= 6;
       heart -= 1;
       respawn();
       life9();
       
   }
   if (bear.collide(baby)) {
    state = 5;
    heart = 3;
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = true;
    for(let i=0; i<6; i++){
        iceT[i].removed = true//mouseIsPressed;
        }
        for(let i=0; i<6; i++){
          iceB[i].removed = true//mouseIsPressed;
          }
          for(let i=0; i<12; i++){
              iceD[i].removed = true//mouseIsPressed;
          }
          resetIce();
          px=150;
          py=25;
}
   if(bear.collide(iceT)){
     //  py -= barrier;
       //py+=6;
   }
   if(bear.collide(iceB)){
     //  py -= barrier;
       //py+=6;
   }
   // collision for iceD
   if (bear.collide(iceD)) {
      py += 20;
   }

   

   
}
    function life9() {
   if (heart == 0) {
       heart1.visible = false;
       // respawn
       // state = losing state
       state = 23;
   }   
   else if (heart == 2) {
       heart3.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce()
   }
   else if (heart == 1) {
       heart2.visible = false;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
       resetIce();
   }
}
    function iceP9() {

    iceT[0].position.x=1620;
    iceT[0].position.y=507;
    iceT[1].position.x=556;
    iceT[1].position.y=403;
    iceT[2].position.x=300;
    iceT[2].position.y=124;
    iceT[3].position.x=844;
    iceT[3].position.y=222;
    iceT[4].position.x=348;
    iceT[4].position.y=241;
    iceT[5].position.x=750;
    iceT[5].position.y=285;

    //top 
    iceD[6].position.x=1620;
    iceD[6].position.y=517;
    iceD[7].position.x=556;
    iceD[7].position.y=413;
    iceD[8].position.x=300;
    iceD[8].position.y=134;
    iceD[9].position.x=844;
    iceD[9].position.y=232;
    iceD[10].position.x=348;
    iceD[10].position.y=251;
    iceD[11].position.x=750;
    iceD[11].position.y=295;

    iceB[0].position.x=1200;
    iceB[0].position.y=391;
    iceB[1].position.x=530;
    iceB[1].position.y=261;
    iceB[2].position.x=254;
    iceB[2].position.y=333;
    iceB[3].position.x=687;
    iceB[3].position.y=341;
    iceB[4].position.x=531;
    iceB[4].position.y=327;
    iceB[5].position.x=390;
    iceB[5].position.y=401;

    //bottom
    iceD[0].position.x=1200;
    iceD[0].position.y=401;
    iceD[1].position.x=530;
    iceD[1].position.y=271;
    iceD[2].position.x=254;
    iceD[2].position.y=343;
    iceD[3].position.x=687;
    iceD[3].position.y=351;
    iceD[4].position.x=531;
    iceD[4].position.y=337;
    iceD[5].position.x=390;
    iceD[5].position.y=411;
        

}
next.position.x;
next.position.y;
//debug();
//mouse();
iceP9();
meltingIce();  
drawSprites();    
// }                
}
    if(state==23){
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 320, 100);
        textSize(25);
        text("Don't give up! Press S or W to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(87)||keyIsDown(83)) {
            state = 22;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }
}
    if(state==24){
        fill(0, 0, 25);
        background(bg);
        fill(255,255,255);
        rect(862,18,100,50,20);
        fill(0)
        textSize(35);
        textFont('Georgia');
        text('EXIT',870,55);
        textSize(50)
        textFont('Georgia');
        text('LEVELS SELECT',320,55);
        textSize(30)
        
        rect(80,170,150,50,20);

        rect(310,170,150,50,20);
       
        rect(540,170,150,50,20);
        
        rect(770,170,150,50,20);
    
        rect(80,290,150,50,20);
      
        rect(310,290,150,50,20);
    
        rect(540,290,150,50,20);
        
        rect(770,290,150,50,20);
        rect(250,410,150,50,20);
        rect(600,410,150,50,20);
        fill(255,255,255);
        text('level: 1',110,205);
        text('level: 2',340,205);
        text('level: 3',570,205);
        text('level: 4',800,205);
        text('level: 5',110,325);
        text('level: 6',340,325);
        text('level: 7',570,325);
        text('level: 8',800,325);
        text('level: 9',280,445);
        text('level: 10',620,445);
     
    }

}





function mouseClicked() {
    if (state==1 && mouseX>380 && mouseX<670 && mouseY>300 && mouseY<375) {
       state=24;
      
     
    //    heart = 3;
    //    heart1.visible = true;
    //    heart2.visible = true;
    //    heart3.visible = true;
    //    for(let i=0; i<6; i++){
    //        iceT[i].removed = true//mouseIsPressed;
    //        }
    //        for(let i=0; i<6; i++){
    //          iceB[i].removed = true//mouseIsPressed;
    //          }
    //          for(let i=0; i<12; i++){
    //              iceD[i].removed = true//mouseIsPressed;
    //          }
    //          resetIce();
    //          px=150;
    //          py=25;
    }
    if(state==1 && mouseX>380 && mouseX<670&&mouseY>420&&mouseY<495){
        state=2;
    }
    if(state==2&& mouseX>200 && mouseX<450&&mouseY>500&&mouseY<575){
        state=24;
        // heart = 3;
        // heart1.visible = true;
        // heart2.visible = true;
        // heart3.visible = true;
        // for(let i=0; i<6; i++){
        //     iceT[i].removed = true//mouseIsPressed;
        //     }
        //     for(let i=0; i<6; i++){
        //       iceB[i].removed = true//mouseIsPressed;
        //       }
        //       for(let i=0; i<12; i++){
        //           iceD[i].removed = true//mouseIsPressed;
        //       }
        // resetIce();
        // px=120;
        // py=25;
    }
    if(state==2&& mouseX>550 && mouseX<800&&mouseY>500&&mouseY<575){
        state=1;
    }
    if (state == 4) {
       state == 3;        
    }
    if(state==3&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==6&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==8&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==10&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==12&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==14&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==16&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==18&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==20&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==22&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==3&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==6&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==8&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==10&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==12&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==14&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==16&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==18&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==20&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==22&&mouseX>578&&mouseX<758&&mouseY>18&&mouseY<68){
        state=24;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }






    if(state==24&&mouseX>80&&mouseX<230&&mouseY>170&&mouseY<220){
        state=3;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>310&&mouseX<460&&mouseY>170&&mouseY<220){
        state=6;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>540&&mouseX<690&&mouseY>170&&mouseY<220){
        state=8;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>770&&mouseX<920&&mouseY>170&&mouseY<220){
        state=10;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>80&&mouseX<230&&mouseY>290&&mouseY<340){
        state=12;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>310&&mouseX<460&&mouseY>290&&mouseY<340){
        state=14;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>540&&mouseX<690&&mouseY>290&&mouseY<340){
        state=16;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>770&&mouseX<920&&mouseY>290&&mouseY<340){
        state=18;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>250&&mouseX<400&&mouseY>410&&mouseY<460){
        state=20;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
    if(state==24&&mouseX>600&&mouseX<750&&mouseY>410&&mouseY<460){
        state=22;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
   
}

function resetIce(){
    iceT = new Group(); // top part
    iceB = new Group(); // bottom part
    iceD = new Group(); // portion of the ice that pushes the player down
    
    // for loop for platforms
    for(let i = 0; i < 6; i++) {
        let newIceT = createSprite(random(0, width), random(0, height));
        newIceT.addImage(loadImage('assets/iceF1.png'));
        newIceT.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceT.add(newIceT);
    }
    for(let i = 0; i < 6; i++) {
        let newIceB = createSprite(random(0, width), random(0, height));
        newIceB.addImage(loadImage('assets/iceF1.png'));
        newIceB.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceB.add(newIceB);
    }
    for(let i = 0; i < 12; i++) {
        let newIceD = createSprite(random(0, width), random(0, height));
        newIceD.addAnimation('normal','assets/iceF1.png')
        newIceD.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        //newIceD1.addAnimation('melty','assets/iceF1.png','assets/ice1.Png','assets/ice2.png','assets/ice3.png','assets/ice4.png','assets/ice5.png');
        iceD.add(newIceD);
       // iceD.add(newIceD1)=false;
    }
    ice = createSprite(150, 200);
    ice.addAnimation('normal','assets/iceF1.png');
    ice.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');

}

function newStage(){
    
}