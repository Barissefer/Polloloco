class ThrowableObject extends MovableObject{

    speedX = 20;
    speedY = 30;
    bottle_break = new Audio('audio/bottle_hit.mp3');
    bottle_collect = new Audio('audio/collect-bottle.mp3');
    bottleUnbroken = true;
    throwableBottle = false;
    bottleSplashed = false;
    bottleLandedAfterThrow = false;
    allIntervals = [];

    BOTTLE_IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    BOTTLE_IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    BOTTLE_RIGHT_DIRECTION = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    BOTTLE_LEFT_DIRECTION = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y, throwableBottle) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png'); 
        this.loadImages(this.BOTTLE_IMAGES_SPLASH);
        this.loadImages(this.BOTTLE_IMAGES_ROTATE);
        this.loadImages(this.BOTTLE_RIGHT_DIRECTION);         
        this.loadImages(this.BOTTLE_LEFT_DIRECTION);         
        this.throwableBottle = throwableBottle;
        this.collectableBottle()
        this.x = x -60;
        this.y = y - 10;
        this.width = 60;
        this.height = 70;
        this.throwBottle();
        this.pushAudioFilesToArray();        
    }
 
    randomizeBottlePosition() {
        this.y = 120;
        this.x = Math.random() * 2000;
    }

    throwBottle() {
        if(this.throwableBottle){
            this.speedY = 10;
            this.applyGravity();        
            this.rotateBottle();
            let throwToOtherDirection = false;
            world.character.otherDirection ? throwToOtherDirection = true : null;            
            let moveBottleX = setInterval(() => {
                this.bottleTouchGround(moveBottleX);
                if(this.bottleUnbroken && !throwToOtherDirection){
                    this.x += 12 ;                                        
                }
                else if(this.bottleUnbroken && throwToOtherDirection){                    
                    this.x -= 12 ;
                }else{
                    this.x += 0;
                }
        },25)
        this.allIntervals.push(this.saveInterval('throwBottle', moveBottleX))
        }
    }

    bottleTouchGround(interval) {        
        if(this.y > 350){
            clearInterval(interval);
            if (world.character.otherDirection) {
                this.loadImage(this.BOTTLE_LEFT_DIRECTION[0]);
                this.bottleUnbroken = false;               
            }
            else{
                this.loadImage(this.BOTTLE_RIGHT_DIRECTION[0]);
                this.bottleUnbroken = false;
            }
        }
    }
    
    rotateBottle() {
            let rotateBottle = setInterval(() => {
                this.bottleTouchGround(rotateBottle)
                if (this.bottleUnbroken) {
                this.playAnimation(this.BOTTLE_IMAGES_ROTATE);
            } 
        }, 60);
        this.allIntervals.push(this.saveInterval('rotatBottle', rotateBottle))
    }

    splashBottle() {
        let splashBottle =setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGES_SPLASH);               
        },1000/ 35);
        setTimeout(() => {
            clearInterval(splashBottle);
            this.y = 2000;
        }, 350);
    }

    isAboveGround() {      
        return this.y < 350;
    }

    collectableBottle() {        
        if(!this.throwableBottle){
            this.bottleUnbroken = false;
        }
    }

    stopAllIntervals() {
        this.allIntervals.forEach((interval) => {
           clearInterval(interval.intervalNumber);
        })
     }
     
     pushAudioFilesToArray() {
        allAudioElements.push(this.bottle_break, this.bottle_collect);
    }

}