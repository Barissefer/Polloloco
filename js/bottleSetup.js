class BottleSetup {
    constructor(world) {
      this.world = world;
    }
  
    addBottlesToThrowableObjects() {
      this.world.level.bottles.forEach((bottle) => {
        this.world.throwableObject.push(bottle);
      });
    }
  
    checkBottleCollision() {
      this.world.throwableObject.forEach((bottle) => {
        this.world.level.enemies.forEach((enemy) => {
          if (this.bottleCanHit(bottle, enemy)) {
            bottle.bottleUnbroken = false;
            bottle.splashBottle();
            bottle.speedY = 3;
            enemy.dead();
            bottle.bottle_break.play();
            enemy.hit();
            enemy.isHurt();
            this.world.hitsOnEndboss++;
          }
        });
      });
    }
  
    bottleCanHit(bottle, enemy) {
      return bottle.isColliding(enemy) && !enemy.isDead && bottle.bottleUnbroken;
    }
  
    checkBottleCollection() {
      this.world.throwableObject.forEach((bottle) => {
        if (this.canCollectBottle(bottle)) {
          this.world.bottleAmount++;
          bottle.y = 3500;
          this.world.setBottleStatusBar();
          bottle.bottle_collect.play();
        }
      });
    }
  
    canCollectBottle(bottle) {
      return (
        !bottle.bottleUnbroken &&
        bottle.isColliding(this.world.character) &&
        !bottle.bottleLandedAfterThrow
      );
    }
  
    checkThrowObjects() {
      let bottleThrowTime = new Date().getTime();
      if (this.canThrowBottle(bottleThrowTime)) {
        let bottle = new ThrowableObject(
          this.world.character.x + 100,
          this.world.character.y + 100,
          true
        );
        this.muteThrownBottleSound(bottle);
        this.world.throwableObject.push(bottle);
        this.world.bottleAmount--;
        this.world.setBottleStatusBar();
        bottle.bottleLandedAfterThrow = true;
        this.world.lastBottleThrown = new Date().getTime();
      }
    }
  
    canThrowBottle(bottleThrowTime) {
      return (
        this.world.keyboard.D &&
        this.world.bottleAmount > 0 &&
        bottleThrowTime - this.world.lastBottleThrown > 500
      );
    }
  
    muteThrownBottleSound(bottle) {
      if (muted) {
        bottle.bottle_break.muted = true;
      }
    }
  }
