import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload ");
  }

  preload() {
    this.load.image(
      "tiles",
      "/0x72_DungeonTilesetII_v1.6/0x72_DungeonTilesetII_v1.6.png"
    );
    this.load.tilemapTiledJSON("map", "/Map/Map.json");
    this.load.atlas(
      "badut",
      "/Player/player_test.png",
      "/Player/player_test.json"
    );
  }

  create() {
    this.scene.start("game");
  }
}
