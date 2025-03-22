class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currenImage = 0;
    errorShown = false;

    drawFrame(ctx) {
        if (movableInstance()) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    movableInstance() {
        return     this instanceof Character 
                || this instanceof Chicken 
                || this instanceof Endboss 
                ||  this instanceof ThrowableObject 
                || this instanceof ChickenSmall
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
        } catch (error){            
            if(!this.errorShown){
                console.log('Error loading image', error);
                console.log('Could not load image', this.img, this);
            }
            this.errorShown = true;
        }        
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    saveInterval(animationName, interval) {
        return  {
                animationName : animationName,
                intervalNumber : interval 
                }
    }

    stopAllIntervals() {
        this.allIntervals.forEach((interval) => {
           clearInterval(interval.intervalNumber);
        })
     }
     

    

}

