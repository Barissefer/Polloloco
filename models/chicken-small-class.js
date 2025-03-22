class ChickenSmall extends MovableObject{
    height = 50;
    width = 50;
    y = 380;
    otherDirection  = false;
    test  = 0;
    allIntervals = [];
    isDead = false; 
    lastJump = new Date().getTime();

    IMAGES_WALKING = [
       'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
 
    IMAGES_DEAD = [
       'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
 
    
 
  constructor() {
     super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
     this.speed = 0.15 + Math.random () * 0.5;
     this.x = 200 + Math.random() * 1500
     this.loadImages(this.IMAGES_WALKING);
     this.loadImages(this.IMAGES_DEAD); 
  }
 
  animate() {
    this.applyGravity();
    this.chickenMoveLeftAnimation();
    this.chickenWalkingAnimation();
 }
 
 dead() {
    this.isDead = true;
    this.loadImage(this.IMAGES_DEAD[0])
 }
 
 chickenMoveLeftAnimation() {
    let chickenMoveLeft = setInterval(() => {
       if (!this.isDead) {
          this.moveLeft();
       }
    }, 1000 / 60);
    this.allIntervals.push(this.saveInterval('chickenMoveLeft', chickenMoveLeft))
 }
 
 chickenWalkingAnimation() {
    let chickenWalkingAnimation = setInterval(() => {
       if (!this.isDead) {
          this.playAnimation(this.IMAGES_WALKING);
          this.smallChickenJump();   
       }
    }, 100);
    this.allIntervals.push(this.saveInterval('chickenWalkingAnimation', chickenWalkingAnimation))
 }
 
 stopAllIntervals() {
    this.allIntervals.forEach((interval) => {
       clearInterval(interval.intervalNumber);
    })
 }

 isAboveGround() {      
    return this.y < 380;
}

 smallChickenJump() {
    let jump = new Date().getTime();
    if(this.chickenCanJump(jump)){        
        this.speedY = 7;
        this.lastJump = new Date().getTime();
    }
 }
 
 chickenCanJump(jump){
    return jump - this.lastJump > Math.random() * 40000 && !this.isAboveGround()
 }

 }