class StatusBar extends DrawableObject {

    x = 0;
    y = 10;
    height = 50;
    width = 200;
    percentage = 100;

    IMAGES_STATUS_BAR_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    IMAGES_STATUS_BAR_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    IMAGES_STATUS_BAR_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    IMAGES_STATUS_BAR_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    

    constructor (x, y, statusBarType) {
        super();    
        this.loadImages(this.IMAGES_STATUS_BAR_HEALTH);
        this.loadImages(this.IMAGES_STATUS_BAR_COINS);
        this.loadImages(this.IMAGES_STATUS_BAR_BOTTLES);
        this.loadImages(this.IMAGES_STATUS_BAR_ENDBOSS);
        this.setPercentage(100, this.IMAGES_STATUS_BAR_HEALTH);
        this.positionStatusbars(x, y);
    }

    positionStatusbars(x, y) {
        this.x = x;
        this.y = y;
    }

    setPercentage(percentage, statusBarType) {
        this.percentage = percentage;
        let imgPath = statusBarType[this.resolveImageIndex(percentage)]
        this.img = this.imageCache[imgPath];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }else if(this.percentage > 80){
            return 4
        }else if(this.percentage > 60){
            return 3
        }else if(this.percentage > 40){
            return 2
        }else if(this.percentage >= 20){
            return 1
        }else if(this.percentage >= 0){
            return 0
        }
    }
}