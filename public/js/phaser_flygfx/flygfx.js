
// The GFX whitebox component for on the fly graphics!
//wb.appendComponent(function () {
var FlyGFX = (function () {

    var api = {};

    // main GFX constructor
    api.GFX = function (opt) {

        opt = opt || {};

        this.game = opt.game || new Phaser.Game();
        this.palette = opt.palette || [0xffffff, 0x000000];
        this.pxSize = opt.pxSize || 1;
        this.layers = opt.layers || [[1, 1, 1, 1, 0, 1, 1, 1, 1]];
        this.width = opt.width || 3;
        this.sheet = opt.sheet || false; // is this a sprite sheet?

        // run any methods that are given in place of
        // literal arrays
        this.buildLayers();

    };

    // run over layers, and call any methods to make a pure array of color index values
    api.GFX.prototype.buildLayers = function () {

        var gfx = this;

        this.layers = this.layers.map(function (layer, li) {

                // use a function to create an array, or just use a literal array
                return layer.constructor.name === 'Function' ? (function () {

                    var i = 0,
                    len = gfx.width * gfx.width,
                    pxData = [];
                    while (i < len) {

                        var x = i % gfx.width,
                        y = Math.floor(i / gfx.width);

                        pxData.push(layer(x, y, i));

                        i += 1;

                    }

                    return pxData;

                }
                    ()) : layer;

            });

    };

    // generate and return a canvas element from layers, not using Phaser Graphics
    api.GFX.prototype.genCanvas = function () {

        var gfx = this;

        // generate the canvas element
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = this.width * this.pxSize * this.layers.length;
        canvas.height = this.width * this.pxSize;

        //document.body.appendChild(canvas);

        this.layers.forEach(function (layer, li) {

            // for each pxData value in the layer / frame
            layer.forEach(function (cIndex, i) {

                var x = i % gfx.width,
                y = Math.floor(i / gfx.width),

                // treat as frames rather than layers?
                xOff = gfx.sheet ? li * gfx.width * gfx.pxSize : 0;

                // if a cIndex value that is out of range, or if the color evaluates to false
                // then this will result in the transparent color
                if (cIndex >= 0 && cIndex <= gfx.palette.length) {

                    if (!!gfx.palette[cIndex]) {

                        ctx.fillStyle = Phaser.Color.getWebRGB(gfx.palette[cIndex]);
                        ctx.fillRect(x * gfx.pxSize + xOff, y * gfx.pxSize, gfx.pxSize, gfx.pxSize);

                    }

                }

            });

        });

        return canvas;

    };

    // create a sprite sheet, and add to cache
    api.GFX.prototype.generateSheet = function (opt) {

        opt = opt || {};

        opt.key = opt.key || 'sheet' + Object.keys(this.game.cache._cache.image).length;
        opt.game = opt.game || this.game;

        // set sheet to true if not all ready before hand
        this.sheet = true;

        // add to cache
        opt.game.cache.addSpriteSheet(
            opt.key,
            null,
            this.genCanvas(), //canvas, //texture.baseTexture.source,
            this.width * this.pxSize,
            this.width * this.pxSize,
            this.layers.length,
            0,
            0);

        // return the sheet
        return this.game.cache._cache.image[opt.key];

    };

    return api;

}
    ());
