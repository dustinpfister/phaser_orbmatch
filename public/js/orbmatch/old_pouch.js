var Pouch = (function () {

    var api = {};

    // an internal method that find the current orb count
    var findOrbCount = function () {

        this.count = 0;

        var i = 0;
        while (i < this.capacity) {

            if (this.orbs[i]) {

                this.count += 1;

            }

            i += 1;

        }

    };

    // place the given orb at the first empty index
    // returns the index
    var placeOrb = function (orb) {

        var i = 0;
        while (i < this.capacity) {

            if (!this.orbs[i]) {

                this.orbs[i] = orb;
                break;

            }

            i += 1;

        }

        return i;

    }

    // pouch constructor
    api.Pouch = function (opt) {

        opt = opt || {};

        this.width = opt.width || 3;
        this.height = opt.height || 3;
        this.capacity = this.width * this.height;

        this.orbs = new Array(this.capacity);
        this.count = 0;
        findOrbCount.call(this);

    };

    // make a new Orb, and place it in the pouch
    // or do nothing if full
    api.Pouch.prototype.makeNew = function (element, cb) {

        var orb = new Orb({
                ratio: [1, 0, 0, 0],
                level: 1
            });

        cb = cb || function () {};

        // find current count
        findOrbCount.call(this);

        if (this.count < this.capacity) {

            var i = placeOrb.call(this, orb);
            this.count += 1;

            cb.call(this, null, orb, i,this);

        } else {

            cb.call(this, 'pouch full', null, null, this);

        }

    }

    return api;

}
    ());
