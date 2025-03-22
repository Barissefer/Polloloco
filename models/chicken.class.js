class Chicken extends MovableObject{
    height = 80;
    width = 80;
    y = 350;
    otherDirection  = false;
    test  = 0;
    allIntervals = [];
    isDead = false; 
    IMAGES_WALKING = [
       'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
       'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
       'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
 
    IMAGES_DEAD = [
       'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
 
    
 
  constructor() {
     super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
     this.speed = 0.15 + Math.random () * 0.5;
     this.x = 450 + Math.random() * 1500
     this.loadImages(this.IMAGES_WALKING);
     this.loadImages(this.IMAGES_DEAD); 
  }
  
  animate() {
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
       }
    }, 100);
    this.allIntervals.push(this.saveInterval('chickenWalkingAnimation', chickenWalkingAnimation))
 }
 
 stopAllIntervals() {
    this.allIntervals.forEach((interval) => {
       clearInterval(interval.intervalNumber);
    })
    }
 }