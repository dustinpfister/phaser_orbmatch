
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'phaser_container');

game.state.add('boot', {

    create: function () {

       // using fly graphics
        var fly = new FlyGFX.GFX({

                game: this.game,
                width: 4,
                pxSize: 8,
                palette: [0x000000, 0xffffff],
                layers: [[1, 1, 1, 1,
                        1, 0, 0, 1,
                        1, 0, 0, 1,
                        1, 1, 1, 1]];

            });

        // making sprite sheet with fly graphics
        var bxSheet = fly.generateSheet({
                key: 'bx'
            });

        // adding sprite with sheet
        var sprite = game.add.sprite(10, 10, 'bx', 0)

    }

});

game.state.start('boot');
