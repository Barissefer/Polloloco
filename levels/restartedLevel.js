function createNewLevel() {
    return new Level(
        [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new Endboss()
        ],

        [
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
    
            new BackgroundObject('img/5_background/layers/air.png', 3* 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3* 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3* 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3* 719)
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
            
        ],
        [ 
        new ThrowableObject(-480, 370, false),
        new ThrowableObject(-100, 370, false),
        new ThrowableObject(444, 370, false),
        new ThrowableObject(1000, 370, false),
        new ThrowableObject(1200, 370, false),
        new ThrowableObject(1400, 370, false),
        new ThrowableObject(1898, 370, false)
        ],

        [
            new Screen(0, 0, 'start'),
            new Screen(0, 0, 'game over')
        ]

    
    );
}