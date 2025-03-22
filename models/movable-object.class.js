class MovableObject extends DrawableObject {

    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.5;
    energy = 100;
    lastHit = 0;
   
    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
           this.x -= this.speed;  
    }

    mirrorImage(ctx) {
            ctx.save();
            ctx.translate(this.width, 0)
            ctx.scale(-1, 1);
            this.x = this.x * -1;
    }

    restoreImage(ctx) {
        ctx.restore();
        this.x = this.x * - 1;
    }


    playAnimation(images) {
        let i = this.currenImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage ++;
    }

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
           
        }, 1000 / 60);
    }

isAboveGround() {      
        return this.y < 230;
}
  
jump(){
    this.speedY = 10;
}

isColliding (mo, offsetXmo, offsetYmo) {
    let offsetX = 0;
    let offsetY = 0;
    if (offsetXmo && offsetYmo) {
        offsetX = offsetXmo;
        offsetY = offsetYmo;
    }
    return  this.x + this.width > mo.x + offsetX &&
            this.y + this. height > mo.y + offsetY &&
            this.x < mo.x + mo.width - offsetX &&
            this.y < mo.y + mo.height - offsetY
}

isDead() {
    return this.energy == 0;
}

isHurt() {
    let timePassed = new Date().getTime() - this.lastHit ;
    timePassed = timePassed / 500 ;
    return timePassed < 0.4 ;
}

hit() {
    this.energy -= 5;   
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime();
    }    
    }

}


