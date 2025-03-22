class Cloud extends MovableObject {

    y = 10;
    x = 680;
    width = 500;
    height = 250;
    cloudSpeed = 0.2;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.animate()
     }

     animate(){
      setInterval(() => {
         this.moveLeft();
      }, 100);
        
     }

     }
    
