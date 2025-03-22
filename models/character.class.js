class Character extends MovableObject {
    height = 200;
    width = 100;
    x = 100;
    y = 230;
    speed = 9;
    world;
    deadAnimationPlayed = false;
    lastX = this.x;
    lastY = this.y;
    energy = 100;
    idleTime = 0;
    jumped = false;
    allIntervals = [];
    fadeInStarted = false;
    gameLostScreen = false;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    footstep_sound = new Audio('audio/footstep-dirt.mp3');
    jump_sound = new Audio('audio/jump1.mp3');
    hurt_sound = new Audio('audio/hurt2.mp3');   
    die_sound = new Audio('audio/die2.mp3');
    gameOver_sound = new Audio('audio/gameover1.mp3');
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadCharacterImages();
        this.applyGravity();
        this.checkIfCharacterIsIdle();
        this.pushAudioFilesToArray();                
    }
    
    loadCharacterImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
    }

    animate() {
        let characterAnimations60FPS = setInterval(() => {
            this.checkAfterJumpAnimation();
            this.characterMoveRightAnimation();
            this.characterMoveLeftAnimation();
            this.characterJumpAnimation();
            this.world.camera_x = -this.x + 100 
        }, 1000 / 60);
        this.allIntervals.push(this.saveInterval('characterAnimation60FPS', characterAnimations60FPS));
        let characterAnimations15FPS = setInterval(() => {
            this.deathAnimationCharacter();
            this.hurtAnimationCharacter();
            this.jumpingAnimationCharacter();
            this.walkingAnimationCharacter();               
        },1000 / 15);
        this.allIntervals.push(this.saveInterval('characterAnimation15FPS', characterAnimations15FPS));
    }
    
   checkIfCharacterIsIdle() {
        let checkIfCharacterIsIdle = setInterval(() => {  
            if (this.x === this.lastX && this.y === this.lastY) {
                this.idleTime += 200; 
                if (this.idleTime >= 6000 && this.idleTime <= 10000) {this.playAnimation(this.IMAGES_IDLE)}
                if(this.idleTime >= 10000){this.playAnimation(this.IMAGES_LONGIDLE)}
            } else {
                this.idleTime = 0; 
            }
            this.lastX = this.x;
            this.lastY = this.y;
        }, 200); 
        this.allIntervals.push(this.saveInterval('checkIfCharacterIsIdle', checkIfCharacterIsIdle));
}

    checkAfterJumpAnimation() {
        if(!this.isAboveGround() && this.jumped && !this.deadAnimationPlayed){
            this.loadImage(this.IMAGES_JUMPING[8])
            this.jumped = false;
        }
    }

    characterMoveLeftAnimation() {
        if(this.world.keyboard.LEFT && this.x > this.world.level.level_start_x && !this.deadAnimationPlayed){
            this.moveLeft();
            !this.isAboveGround() ? this.footstep_sound.play() : null;
            this.otherDirection = true;
        }
    }

    characterMoveRightAnimation() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.deadAnimationPlayed){
            this.moveRight() ;              
            !this.isAboveGround() ? this.footstep_sound.play() : null;
            this.otherDirection = false;
        }
    }

    characterJumpAnimation() {
        if(this.world.keyboard.SPACE && !this.isAboveGround() && !this.deadAnimationPlayed){
            this.jumped = true;
            this.jump();
            this.jump_sound.play();
        }
    }

    deathAnimationCharacter() {  
        if(this.isDead() && !this.deadAnimationPlayed){
            this.die_sound.play();
            this.speedY = 15;
            this.deadAnimationPlayed = true;            
            this.playAnimation(this.IMAGES_DEAD);
            let deathAnimaion = setInterval(() => {
                this.y += 7;
                this.loadImage(this.IMAGES_DEAD[5])
                if(this.y > 1000){                    
                    this.y = 1000;
                    clearInterval(deathAnimaion);                
                }            
                }, 1000 / 60);
           }
    }

    hurtAnimationCharacter() {
        if(this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurt_sound.play();
        }        
    }

    jumpingAnimationCharacter() {
        if(this.isAboveGround() && !this.deadAnimationPlayed){
            this.playAnimation(this.IMAGES_JUMPING); 
        }
    }

    walkingAnimationCharacter() {        
        if(this.world.keyboard.RIGHT && !this.isAboveGround() && !this.deadAnimationPlayed || 
        this.world.keyboard.LEFT && !this.isAboveGround() && !this.deadAnimationPlayed){
            this.playAnimation(this.IMAGES_WALKING);
            }
    }

stopAllIntervals() {
        this.allIntervals.forEach((interval) => {
           clearInterval(interval.intervalNumber);
        })
     }

    
    pushAudioFilesToArray() {
        allAudioElements.push(this.footstep_sound, this.jump_sound, this.hurt_sound, this.die_sound, this.gameOver_sound);
    }

gameLost() {        
        if(this.isDead() && world.character.y >= 800 && !this.gameLostScreen){             
            world.level.screen[1].x = this.x ;
            world.level.screen[1].y = 20 ;
            world.level.screen[1].img.src = world.level.screen[1].gameOverScreen;
            world.level.screen[1].fadeIn();
            world.character.stopAllIntervals();
            this.gameLostScreen = true;                  
        }        
    } 
    
hit(enemy) {
    if (!this.isAboveGround() ) { this.energy -= 1}
    if(enemy instanceof Endboss) { this.energy -= 3}
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime();
    }
    }
}