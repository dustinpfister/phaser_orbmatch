(function () {

    var mkPouch = function () {

        // using fly graphics
        var flyPouch = new FlyGFX.GFX({
                game: this.game,
                width: 32 * 4,
                pxSize: 1,
                palette: [0x000000, 0x4a4a4a, 0x8a8a8a],
                layers: [function (x, y, i) {
                        if (x % 32 === 0 || y % 32 === 0) {
                            return 2;
                        }
                        return 1;
                    }
                ]
            });

        // sheet for pouch
        flyPouch.generateSheet({
            key: 'sheet_pouch'
        });

        // sprite for pouch
        var pouch = game.add.sprite(50, 50, 'sheet_pouch', 0);
        pouch.inputEnabled = true;

        // pouch events
        pouch.events.onInputDown.add(function (pouch, pt) {

            // x, and y relative to pouch
            var x = pt.x - pouch.x,
            y = pt.y - pouch.y;

            console.log(x, y);

        });

    };

    // add the game state
    game.state.add('create', {

        create: function () {

            mkPouch();

        }

    });

}
    ());
