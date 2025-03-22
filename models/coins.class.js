class Coin extends MovableObject{

    x = 200;
    y = 380;
    width = 150;
    height = 150;
    direction = -1;
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
    allIntervals = [];

 constructor (x, y) {
    super();
    this.loadImages(this.IMAGES_COINS)
    this.loadImage(this.IMAGES_COINS[0]);
    this.randomCoinPositionX();
    this.randomCoinPositionY()
    this.animateCoin();
    this.pushAudioFilesToArray();
 }   

 collect_coin_sound = new Audio('audio/collect-coin.mp3');

 animateCoin() {
    let animateCoin = setInterval(() => {
        if (this.width <= 140 || this.width >= 160) {
            this.direction *= -1;
        }
        const oldWidth = this.width;
        const oldHeight = this.height;

        this.width += this.direction * 1;
        this.height += this.direction * 1;

        const widthDiff = (oldWidth - this.width) / 2;
        const heightDiff = (oldHeight - this.height) / 2;

        this.x += widthDiff;
        this.y += heightDiff;
    }, 50);

    this.allIntervals.push(this.saveInterval('animateCoin', animateCoin))  
}

randomCoinPositionX() {
    this.x = 150 + Math.random() * 1500
}

randomCoinPositionY() {
    this.y = 150 + 150 * Math.random() 
}

stopAllIntervals() {
    this.allIntervals.forEach((interval) => {
       clearInterval(interval.intervalNumber);
    })
 }
 
 pushAudioFilesToArray() {
    allAudioElements.push(this.collect_coin_sound);
}
}
