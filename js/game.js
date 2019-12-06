'use strict';

// MAKE SURE TO UNCOMMENT ON DEPLOY ####################################################
// window.onload = function () {

// Namespace and main variables for our instance of the game
const Minecraft = {
    html: {
        $toolkitToolsContainer: $( '#tools-container' ),
        $toolkitTilesContainer: $( '#tiles-container' ),
        $gameContainer:         $( '#game-container' ),
        $startBtn:              $( '.start-game' ),        
    },

    tools: {
        pickaxe: createTool('pickaxe', ['rock', 'stone', 'gate', 'diamond']),
        shovel:  createTool('shovel',  ['dirt', 'grass']),
        axe:     createTool('axe',     ['tree', 'leaf']),
        bucket:  createTool('bucket',  ['lava']),
    },

    tiles: {
        diamond: createTile('diamond'),
        grass:   createTile('grass'),
        stone:   createTile('stone'),
        dirt:    createTile('dirt'),
        gate:    createTile('gate'),
        lava:    createTile('lava'),
        leaf:    createTile('leaf'),
        rock:    createTile('rock'),
        tree:    createTile('tree'),
        tnt:     createTile('tnt'),
    },

    tileGrid:   undefined,
    tileGridUI: undefined,
    numOfRows:  undefined,
    numOfCols:  100,
    tileSize:   50,   // in px
}

// Initiates the game page
Minecraft.init      = function () {
    this.html.$startBtn.one('click', this.startGame.bind(this));
};

// Event handler
Minecraft.startGame = function () {

    this.numOfRows        = Math.floor($( window ).height() / this.tileSize)
    const gridMatrix      = build2dArray(this.numOfRows, this.numOfCols);
    const callbacksMatrix = build2dArray(this.numOfRows, this.numOfCols);

    this.session    = createGameSession(this.tools, this.tiles);
    this.tileGrid   = createTileGrid   (gridMatrix, callbacksMatrix, this.tiles);
    this.tileGridUI = createTileGridUI (this.tileGrid, this.session, this.tileSize);

    this.tileGridUI.render(this.html.$gameContainer, this.html.$toolkitToolsContainer, this.html.$toolkitTilesContainer);
};

// --------------------------------------------------------------------------------------
// General functions that may be reused outside this project
function build2dArray(numOfRows, numOfCols) {
    const matrix = new Array(numOfRows).fill(null);

    let i = -1;
    while (++i < numOfRows) {
        matrix[i] = new Array(numOfCols).fill(null);
    }
    return matrix;
}

// --------------------------------------------------------------------------------------
// And this is where all the magic happens
Minecraft.init();
// ------------------------------------------------------------------------------------------
// } // MAKE SURE TO UNCOMMENT ON DEPLOY ####################################################