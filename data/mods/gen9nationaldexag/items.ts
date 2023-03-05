export const Items: {[k:string]:ModdedItemData} = {
    belueberry: {
        inherit: true,
        isNonstandard: null
    },

    berry: {
        inherit: true,
        isNonstandard: null
    },

    berserkgene: {
        inherit: true,
        isNonstandard: null
    },

    bitterberry: {
        inherit: true,
        isNonstandard: null
    },

    blukberry: {
        inherit: true,
        isNonstandard: null
    },

    buggem: {
        inherit: true,
        isNonstandard: null
    },

    burntberry: {
        inherit: true,
        isNonstandard: null
    },

    cherishball: {
        inherit: true,
        isNonstandard: null
    },

    cornnberry: {
        inherit: true,
        isNonstandard: null
    },

    darkgem: {
        inherit: true,
        isNonstandard: null
    },

    dragomgem: {
        inherit: true,
        isNonstandard: null
    },

    durinberry: {
        inherit: true,
        isNonstandard: null
    },

    electricgem: {
        inherit: true,
        isNonstandard: null
    },

    fairygem: {
        inherit: true,
        isNonstandard: null
    },

    firegem: {
        inherit: true,
        isNonstandard: null
    },

    flyinggem: {
        inherit: true,
        isNonstandard: null
    },

    ghostgem: {
        inherit: true,
        isNonstandard: null
    },

    goldberry: {
        inherit: true,
        isNonstandard: null
    },

    grassgem: {
        inherit: true,
        isNonstandard: null
    },

    groundgem: {
        inherit: true,
        isNonstandard: null
    },

    iceberry: {
        inherit: true,
        isNonstandard: null
    },

    icegem: {
        inherit: true,
        isNonstandard: null
    },

    magostberry: {
        inherit: true,
        isNonstandard: null
    },

    mail: {
        inherit: true,
        isNonstandard: null
    },

    mintberry: {
        name: "Mint Berry",
        spritenum: 65,
        isBerry: true,
        naturalGift: {
            basePower: 80,
            type: "Water"
        },
        onUpdate(pokemon) {
            if (pokemon.status === 'slp' && (!pokemon.lastMove || pokemon.lastMove.id !== 'rest')) {
                pokemon.eatItem();
            }
        },
        onResidualOrder: 5,
        onResidual(pokemon) {
            if (pokemon.lastMove && pokemon.lastMove.id === 'rest') {
                pokemon.eatItem();
            }
        },
        onEat(pokemon) {
            if (pokemon.status === 'slp') {
                pokemon.cureStatus();
            }
        },
        num: 150,
        gen: 2,
        isNonstandard: null
    },

    miracleberry: {
        name: "Miracle Berry",
        spritenum: 262,
        isBerry: true,
        naturalGift: {
            basePower: 80,
            type: "Flying"
        },
        onUpdate(pokemon) {
            if ((pokemon.status || pokemon.volatiles['confusion']) && (!pokemon.lastMove || pokemon.lastMove.id !== 'rest')) {
                pokemon.eatItem();
            }
        },
        onResidualOrder: 5,
        onResidual(pokemon) {
            if (pokemon.lastMove && pokemon.lastMove.id === 'rest') {
                pokemon.eatItem();
            }
        },
        onEat(pokemon) {
            if (pokemon.status || pokemon.volatiles['confusion']) {
                pokemon.cureStatus();
                pokemon.removeVolatile('confusion');
            }
        },
        num: 157,
        gen: 2,
        isNonstandard: null
    },

    mysteryberry: {
        inherit: true,
        isNonstandard: null
    },

    nanabberry: {
        inherit: true,
        isNonstandard: null
    },

    nomelberry: {
        inherit: true,
        isNonstandard: null
    },

    oldamber: {
        inherit: true,
        isNonstandard: null
    },

    pamtreberry: {
        inherit: true,
        isNonstandard: null
    },

    parkball: {
        inherit: true,
        isNonstandard: null
    },

    pinapberry: {
        inherit: true,
        isNonstandard: null
    },

    pinkbow: {
        inherit: true,
        isNonstandard: null
    },

    poisongem: {
        inherit: true,
        isNonstandard: null
    },

    polkadotbow: {
        inherit: true,
        isNonstandard: null
    },

    przcureberry: {
        inherit: true,
        isNonstandard: null
    },

    psncureberry: {
        inherit: true,
        isNonstandard: null
    },

    psychicgem: {
        inherit: true,
        isNonstandard: null
    },

    rabutaberry: {
        inherit: true,
        isNonstandard: null
    },

    razzberry: {
        inherit: true,
        isNonstandard: null
    },

    rockgem: {
        inherit: true,
        isNonstandard: null
    },

    spelonberry: {
        inherit: true,
        isNonstandard: null
    },

    steelgem: {
        inherit: true,
        isNonstandard: null
    },

    strangeball: {
        inherit: true,
        isNonstandard: null
    },

    watergem: {
        inherit: true,
        isNonstandard: null
    },

    watmelberry: {
        inherit: true,
        isNonstandard: null
    },

    wepearberry: {
        inherit: true,
        isNonstandard: null
    }
};
