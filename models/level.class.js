class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    screen;
    level_start_x = -619;
    level_end_x = 3 * 719;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, screen) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.screen = screen;
    }
}