import Phaser from "phaser";
import { debugDraw } from "../utils/debug";

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private knight!: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super("game");
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys(); //create the cursor
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("dungeon", "tiles");

    map.createLayer("Ground", tileset);
    const walls = map.createLayer("Walls", tileset);

    //set the collision to true
    walls.setCollisionByProperty({ collides: true });

    // debugDraw(walls, this);

    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // walls.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });

    this.knight = this.physics.add.sprite(
      128,
      128,
      "badut",
      "frames/knight_f_idle_anim_f1.png"
    );

    // this.anims.create({
    //   key: "knight-idle-down",
    //   frames: [{ key: "badut", frame: "frames/knight_f_idle_anim_f1.png" }],
    // });

    //this will allow the phaser to generate the animation from 0-3 base on the file name
    this.anims.create({
      key: "knight-idle-down",
      frames: this.anims.generateFrameNames("badut", {
        start: 1,
        end: 3,
        prefix: "frames/knight_f_idle_anim_f",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: "knight-run-down",
      frames: this.anims.generateFrameNames("badut", {
        start: 0,
        end: 3,
        prefix: "frames/knight_f_run_anim_f",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 15,
    });

    this.knight.anims.play("knight-idle-down");
    this.knight.body.setSize(this.knight.width * 0.9, this.knight.height * 0.9);
    this.physics.add.collider(this.knight, walls);

    this.cameras.main.startFollow(this.knight);
  }

  update(time: number, dt: number) {
    if (!this.cursors || !this.knight) return;

    const speed = 100;
    if (this.cursors.left.isDown) {
      this.knight.setVelocity(-speed, 0);
      this.knight.scaleX = -1;
      this.knight.body.offset.x = 16;
    } else if (this.cursors.right.isDown) {
      this.knight.setVelocity(speed, 0);
      this.knight.scaleX = 1;
      this.knight.body.offset.x = 0;
    } else if (this.cursors.up.isDown) {
      this.knight.setVelocity(0, -speed);
      this.knight.body.offset.y = 8;
    } else if (this.cursors.down.isDown) {
      this.knight.setVelocity(0, speed);
    } else {
      this.knight.setVelocity(0, 0);
    }
  }
}
