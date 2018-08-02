(function () {

    // create main game data object if it is not there
    var data = game.data = game.data || {};

    data.pouch = game.data.pouch || new Pouch.Pouch({
            width: 4,
            height: 4
        });

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
            y = pt.y - craft.y,
            tileX = Math.floor(x / 32),
            tileY = Math.floor(y / 32),
            index = tileY * 3 + tileX;

            console.log(index);

        });

    };

    // make an orb sprite with the given orb, and starting index in the pouch
    var mkOrb = function (orb, index) {

        // using fly graphics
        var flyOrb = new FlyGFX.GFX({
                game: this.game,
                width: 32,
                pxSize: 1,
                palette: [0x000000, 0xff0000, 0x8a8a8a],
                layers: [function (x, y, i) {

                        if (Phaser.Math.distance(x, y, 15, 15) < 14) {

                            return 1

                        }

                    }
                ]
            });

        // sheet for pouch
        //console.log(flyOrb.genCanvas());
        var bitmap = new Phaser.BitmapData(game, 'orb_bitmap', 32, 32);
        //bitmap.canvas = flyOrb.genCanvas();

        //bitmap.context.fillStyle = '#ff0000';
        bitmap.context.drawImage(flyOrb.genCanvas(), 0, 0);

        var pouch = game.data.sprite.pouch;

        var orbSprite = game.add.sprite(pouch.x, pouch.y, bitmap);

        // sprite should be draggable
        orbSprite.inputEnabled = true;
        orbSprite.input.draggable = true;

        orbSprite.input.snapOnRelease = true;
        orbSprite.input.snapX = 32;
        orbSprite.input.snapY = 32;

        orbSprite.events.onDragStop.add(function (orbSprite) {

            var x = orbSprite.x - pouch.x,
            y = orbSprite.y - pouch.y;

            if (x < 0 || y < 0 || x >= pouch.width || y >= pouch.height) {

                // back home
                var sp = orbSprite.input.dragStartPoint;
                orbSprite.x = sp.x;
                orbSprite.y = sp.y;

            }

        });

    };

    // add the game state
    game.state.add('create', {

        create: function () {

            mkPouch();
            mkCraft();

            // testing out make new pouch method
            data.pouch.makeNew([1, 0, 0, 0], function (err, orb, index) {

                if (orb) {

                    mkOrb(orb, index);

                }

            });

        }

    });

}
    ());
