class World{
    character = new Character();
    statusBarHealth = new StatusBar(0, 10, "health");
    statusBarCoins = new StatusBar(0, 50, "coins");
    statusBarBottles = new StatusBar(0, 90, "bottles");
    statusBarEndboss = new StatusBar(510, -100);
    level = level1;
    startScreen = this.level.screen[0].startScreenLoaded;
    gameOver = false;
    allAudioFiles = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coinAmount = 0;
    bottleAmount = 0;
    hitsOnEndboss = 0;
    throwableObject = [];
    lastBottleThrown = new Date().getTime();
    maxCoins = this.level.coins.length;
    maxBottles = this.level.bottles.length;
    reloadButtonVisible = false;
    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.run();
      this.setStatusBarImages();
      this.addBottlesToThrowableObjects();
    }

    addBottlesToThrowableObjects() {
      this.level.bottles.forEach((bottle) => {
        this.throwableObject.push(bottle);
      });
    }

    setStatusBarImages() {
      this.statusBarHealth.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_HEALTH[5]);
      this.statusBarCoins.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_COINS[0]);
      this.statusBarBottles.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_BOTTLES[0]);
      this.statusBarEndboss.loadImage(this.statusBarEndboss.IMAGES_STATUS_BAR_ENDBOSS[0]);
    }

    setStatusBarEndboss() {
      if (this.character.x >= 1500) {
        this.statusBarEndboss.y = 15;
      }
      this.statusBarEndboss.setPercentage(
        this.getPercentageOfEndboss(),
        this.statusBarEndboss.IMAGES_STATUS_BAR_ENDBOSS);
    }
  
    run() {
      setInterval(() => {
        this.checkCollisions();
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkBottleCollection();
        this.setStatusBarEndboss();
        this.checkThrowObjects();
        this.displayReloadButton();
      }, 25);
    }
  
    displayReloadButton() {
      if(this.gameOver || world.level.enemies[6].isDead && !this.reloadButtonVisible){
        this.reloadButtonVisible = true;
        if(world.level.enemies[6].isDead){
          setTimeout(() => {
            reloadButton.style.display = 'flex';
            reloadButtonBig.style.display = 'flex';
          }, 2500);
        }else{
            reloadButton.style.display = 'flex';
            reloadButtonBig.style.display = 'flex';
        }     
      }
    }
  
    setWorld() {
      this.character.world = this;
      this.statusBarBottles.world = this;
      this.statusBarCoins.world = this;
      this.statusBarBottles.world = this;
      this.statusBarEndboss.world = this;
    }
  
    checkThrowObjects() {
      let bottleThrowTime = new Date().getTime();
      if (this.canThrowBottle(bottleThrowTime)) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, true);
        this.muteThrownBottleSound(bottle);
        this.throwableObject.push(bottle);
        this.bottleAmount--;
        this.setBottleStatusBar();
        bottle.bottleLandedAfterThrow = true;
        this.lastBottleThrown = this.lastBottleThrown;
        this.lastBottleThrown = new Date().getTime();
      }
    }
  
    canThrowBottle(bottleThrowTime) {
      return (
        this.keyboard.D &&
        this.bottleAmount > 0 &&
        bottleThrowTime - this.lastBottleThrown > 1000);
    }
  
    muteThrownBottleSound(bottle) {
      if (muted) { bottle.bottle_break.muted = true }
    }
  
    checkCollisions() {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy,-5,-5) && !enemy.isDead ) {
          this.jumpOnTop(enemy);
          this.character.hit(enemy);
          this.character.isDead();   
          this.statusBarHealth.setPercentage(this.character.energy,this.statusBarHealth.IMAGES_STATUS_BAR_HEALTH);
        }});
    }
  
    checkBottleCollision() {
      this.throwableObject.forEach((bottle) => {
        this.level.enemies.forEach((enemy) => {
          if (this.bottleCanHit(bottle, enemy)) {
            bottle.bottleUnbroken = false;
            bottle.splashBottle();
            bottle.speedY = 3;
            enemy.dead();
            bottle.bottle_break.play();
            enemy.hit();
            enemy.isHurt();
            this.hitsOnEndboss++;
          }
        });
      });
    }
  
    bottleCanHit(bottle, enemy) {
      return bottle.isColliding(enemy) && !enemy.isDead && bottle.bottleUnbroken
    }
  
    jumpOnTop(enemy) {
      if (this.canJumpOn(enemy) && this.character.speedY < 0) { 
          this.character.speedY = 5;
          enemy.dead();
      }
    }
  
    canJumpOn(enemy) {
      return this.character.y <= 200 && this.character.isHurt() && !(enemy instanceof Endboss)
    }

    checkBottleCollection() {
      this.throwableObject.forEach((bottle) => {
        if (this.canCollectBottle(bottle)) {
          this.bottleAmount++;
          bottle.y = 3500;
          this.setBottleStatusBar();
          bottle.bottle_collect.play();
        }
      });
    }
  
    canCollectBottle(bottle){
      return !bottle.bottleUnbroken && bottle.isColliding(this.character) && !bottle.bottleLandedAfterThrow
    }
  
    checkCoinCollision() {
      let coinOffsetX = 50;
      let coinOffsetY = 120;
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin, coinOffsetX, coinOffsetY)) {
          this.level.coins.splice(index, 1);
          this.coinAmount++;
          coin.collect_coin_sound.play();
          this.setCoinStatusBar();
        }
      });
    }
  
    setCoinStatusBar() {
      this.statusBarCoins.setPercentage(
        this.getPercentageOfCoins(),
        this.statusBarCoins.IMAGES_STATUS_BAR_COINS
      );
    }
  
    setBottleStatusBar() {
      this.statusBarBottles.setPercentage(
        this.getPercentageOfBottles(),
        this.statusBarBottles.IMAGES_STATUS_BAR_BOTTLES
      );
    }
  
    getPercentageOfCoins() {
        return (this.coinAmount / this.maxCoins) * 100
    }
  
    getPercentageOfBottles() {
         return (this.bottleAmount / 5) * 100
        }
  
    getPercentageOfEndboss() {
      let hits = world.level.enemies[world.level.enemies.length - 1].hits;
      return 100 - (this.hitsOnEndboss / 4) * 100;
    }
  
    draw() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.translate(this.camera_x, 0);
      if (this.startScreen) {
        this.addToMap(this.level.screen[0]);      
      } else {
        this.setupLevelObjects();
        this.drawGameOverScreen();
      }
      let self = this;
      requestAnimationFrame(function () { self.draw() });
    }
  
    setupLevelObjects() {
      this.addObjectToMap(this.level.backgroundObjects);
      this.addObjectToMap(this.level.clouds);
      this.ctx.translate(-this.camera_x, 0);
      this.drawStatusBars();
      this.ctx.translate(this.camera_x, 0); 
      this.drawMovableObjects();
      this.ctx.translate(-this.camera_x, 0);
    }
  
    drawMovableObjects() {
      this.addObjectToMap(this.level.enemies);
      this.addObjectToMap(this.level.coins);
      this.addObjectToMap(this.throwableObject);
      this.addToMap(this.character);
      world.level.enemies[6].isDead ? this.addToMap(this.level.screen[0]): null;
    }
  
    drawStatusBars() {
      this.addToMap(this.statusBarHealth);
      this.addToMap(this.statusBarBottles);
      this.addToMap(this.statusBarCoins);
      this.addToMap(this.statusBarEndboss);
    }
  
    drawGameOverScreen() {
      if(world.character.isDead() && world.character.y > 800){
        this.addToMap(this.level.screen[1]);
        this.gameOverSound()
      }
    }

    gameOverSound(){
      if (!this.gameOver) {
        this.gameOver = true;
        myRange.value = 10;
        background_sound.volume = 0.04;
        world.character.gameOver_sound.play();     
      }
    }
  
    addObjectToMap(objects) {
      objects.forEach((ob) => {this.addToMap(ob)});
    }
  
    addToMap(mo) {
      if (mo.otherDirection) {this.mirrorImage(mo)}
      mo.draw(this.ctx);
      if (mo.otherDirection) {this.restoreImage(mo)}
    }
  
    mirrorImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  
    restoreImage(mo) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
  
  