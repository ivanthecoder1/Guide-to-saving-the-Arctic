let state = 1;

let polarBear;

let jump = false; // are we jumping
let direction = 1; // force of gravity in the y direction
let velocity = 3; // speed of the player
let jumpPower = 50; // strength of player's jump
let fallingSpeed = 3; // equal to velocity
let minHeight = 478; // height of ground
let maxHeight = 0; // height of sky
let jumpCounter = 0; // keeps track of how much we are jumping

let jumpSpeed=15;
let jumpWatch=0;
let barrier=7
let platL;
let platR;
let platT;
let platB;
let pLeft;
let pRight;
let pTop;
let pBottom;
let angle;
function preload() {
    // polarBear = loadAnimation('assets/bearX.png','assets/polar.png');
    rightBear = loadImage('assets/bearX1.png');
    //leftBear=loadAnimation('assets/bearX.png','assets/bearY.png');
    leftBear = loadImage('assets/bearX.png');
    primeBear = loadImage('assets/prime.png');
   
}

function setup() {
    createCanvas(1000, 600);

    polarBear = new Player(rightBear, 140, 240,40,30);
    platform1 = new Platform (100, 380, 100, 20);
    platform2 = new Platform (580, 180, 100, 30);
    platform3 = new Platform (300, 380, 100, 20);
    platform4 = new Platform (300, 80, 100, 30);
    ground=new Platform(0,500,1000,100);
    
    platforms = [platform1, platform2, platform3, platform4,ground];
    
   /* for(i=0;i<10;i++){
        let form[i] = new Plarform(this.myXP,this.platformY,this.w,this.h);
        platform=form;
    }*/
    // platforms = [platform1, platform2];
    noStroke();
}

    let gravity = 0.1;
    let vy = -1.0;

function draw() {
    

    fill(0, 0, 25);
    background(0, 170, 255);
    
    fill(0, 0, 255);
    rect(0, 500, 1000, 100);
   
    
    
    function player(){
        polarBear.show();
        polarBear.move();
        polarBear.gravity();
        for (let i = 0; i < platforms.length; i++){
            polarBear.collision(platforms[i]);
        }
        polarBear.jumpObserver();
       
    };

    player();
    for (i = 0; i < platforms.length; i++) {
        platforms[i].show();
        //platforms[i].collision();
    }
    
    // platform1.show();
    // platform2.show();
    
    
    
 
    // animation(polarBear, 250, 250);

   // polarBear.frameDelay=20;
    //rect(170, 170, 70, 70);
   // image(100,100,100,100);   
}





class Player {
    constructor(image, x, y, w,h) {
        this.img = image;
        this.myXP = x;
        this.myYP = y;
        this.mW = w;
        this.mH= h;
    }
    show() {
        image(this.img, this.myXP, this.myYP, this.mW,this.mH);
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.myXP -= 5;
        angle=  image(leftBear,this.myXP,this.myYP,this.mW,this.mH);
        }
        else{
        angle=   image(rightBear,this.myXP,this.myYP,this.mW,this.mH);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.myXP += 5;
          // image(rightBear,this.myXP,this.myYP,this.mW,this.mH);
        }
        else{
          // image(leftBear,this.myXP,this.myYP,this.mW,this.mH);
        }

      //  if (keyIsDown(32)) {
           // this.myYP -= jumpSpeed;
            
                
      //  } 
        if (keyWentUp(UP_ARROW)){
            //this.myYP -=5// jumpSpeed;
            jump=true;
        }
        else{
           jump=false;
        }
        
      
    }
    
    gravity() {
        
        vy += gravity;
        this.myYP += vy;
        vy=constrain(vy,1,3.9);
        
        this.myYP = constrain(this.myYP,0,1000);
        //console.log(gravity);
        console.log(vy);
        
            if (this.myYP >= minHeight && jump == false){
                // stop falling on the ground
                this.myYP = this.myYP;
                jumpCounter = 0;
                
            } 
            else {
                this.myYP = this.myYP + (direction*velocity); // code that makes gravity work
                
            }
    
            if (jump == true) {
                if(this.myYP <= maxHeight || jumpCounter >= jumpPower) {
                    if (this.myYP >= minHeight) {
                        this.myYP = minHeight;
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

            //console.log('jump',jump);
            //console.log ('direction',direction);
            console.log('velocity',velocity)  
            //console.log('jumpPower',jumpPower) 
            console.log('fallingSpeed',fallingSpeed) 
            //console.log('minHeight',minHeight)
            //console.log('maxHeight',maxHeight)
            //console.log('jumpCounter',jumpCounter) 
 
        }
        
    
    
    collision(platform){
        let myLeft=this.myXP+0;
        let myRight=this.myXP+this.mW;
        let myTop=this.myYP+0;
        let myBottom=this.myYP+this.mH;

        let platL=platform.platformX+0;
        let platR=platform.platformX+platform.w;
        let platT=platform.platformY+0;
        let platB=platform.platformY+platform.h;

        if(!(platR < myLeft || myRight < platL || myTop > platB || platT > myBottom)) {
            this.myYP-=barrier
            //this.myYP-=1
           
                jump=true;
           jumpWatch=0;
           barrier=7;
            
        }
        /*
                  if(c2Right < myLeft || myRight < c2Left || myTop > c2Bottom || c2Top > myBottom) {

        }
        */
    }
    jumpObserver(){
       
        if (jump==true){
            jumpWatch+=1;
        }


        if (jumpWatch>10){
            jump=false;
           // jumpWatch=0
        }

      console.log('jumpwatch',jumpWatch)

           
        }

    
}

class Platform {
    constructor(x, y, w, h) {    
        this.platformX = x;
        this.platformY = y;
        this.w = w;
        this.h = h;
    }

    show() {
        fill(0, 255, 255);
        rect(this.platformX,this.platformY,this.w,this.h);
        /*rect(this.platformX, this.platformY, (this.w/2), (this.h/2));//side 1
        rect(this.platformX+(this.w/2), this.platformY, (this.w/2), (this.h/2));//side 2
        rect(this.platformX, this.platformY+(this.h/2), (this.w/2), (this.h/2));// side 3
        rect(this.platformX+(this.w/2), this.platformY+(this.h/2), (this.w/2), (this.h/2));//side 4*/
        
    }
    
}

// class Water {
//     constructor(x, y, w, h) {    
//         this.platformX = x;
//         this.platformY = y;
//         this.w = w;
//         this.h = h;
//     }
//     show() {
//         rect(0, 500, 1000, 100);
//         collisionDeath()
//     }
//     collisionDeath() {

//     }
    
// }

 






