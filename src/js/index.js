/**
 *
 * @type {Phaser.Game}
 */
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
});

function preload() {
    // this.load.image() calls here.
}

function create() {
    // Initiate game logic here.
}