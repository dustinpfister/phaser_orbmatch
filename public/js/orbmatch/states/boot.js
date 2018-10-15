game.state.add('boot', {

    create: function () {

        Plugin_Orb(game, {});

        var sprite = game.data.CreateOrbSprite(),
        group = game.add.group();

        group.add(sprite);

    }
});
