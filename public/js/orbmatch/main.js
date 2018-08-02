
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'phaser_container');

game.state.add('boot', {

    create: function () {

        console.log('yeah');

    }

});

game.state.start('boot');
