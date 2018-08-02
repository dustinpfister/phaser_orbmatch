(function () {

    // create main game data object if it is not there
    var data = game.data = game.data || {};

    data.pouch = game.data.pouch || [];

    // data object for create state
    data.sprite = {

        pouch: null, // what will be a ref to the pouch sprite
        craft: null, // what will be a ref to the craft sprite

    };

    // make the Pouch that will hold current ORBS
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
        var pouch = data.sprite.pouch = game.add.sprite(32, 64, 'sheet_pouch', 0);
        pouch.name = 'pouch';

        // pouch events
        pouch.inputEnabled = true;
        pouch.events.onInputDown.add(function (pouch, pt) {

            // x, and y relative to pouch
            var x = pt.x - pouch.x,
            y = pt.y - pouch.y;

            console.log(x, y);
            console.log(pouch.name);

        });

    };

    // make the craft sprite that will be used to create sprites
    var mkCraft = function () {

        // using fly graphics
        var flyCraft = new FlyGFX.GFX({
                game: this.game,
                width: 32 * 3,
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
        flyCraft.generateSheet({
            key: 'sheet_craft'
        });

        // sprite for pouch
        var craft = data.sprite.craft = game.add.sprite(32 * 6, 64, 'sheet_craft', 0);
        craft.name = 'craft';
        craft.inputEnabled = true;

        // pouch events
        craft.events.onInputDown.add(function (craft, pt) {

            // x, and y relative to pouch
            var x = pt.x - craft.x,
            y = pt.y - craft.y;

            console.log(x, y);
            console.log(craft.name);

        });

    };

    // make an orb that will be placed in the pouch
    mkOrb = function () {}

    // add the game state
    game.state.add('create', {

        create: function () {

            mkPouch();
            mkCraft();

            console.log(data);

        }

    });

}
    ());
