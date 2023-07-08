import { Container, Graphics } from "pixi.js";
import { Scene } from "./Scene";

export class GameScene extends Container implements Scene {
   static NAME = "game"

   start = () => {
      const graphics = new Graphics()
      graphics.beginFill(0xffffff)
      graphics.drawRect(0, 0, 20, 20)
      graphics.endFill()

      this.addChild(graphics)
   }

   stop = () => {}
}
