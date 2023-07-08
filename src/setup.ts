import { SceneManager } from "./Scene"
import { GameScene } from "./GameScene"
import { Container } from "pixi.js"

export const setup = (stage: Container) => {
   const scenes = new SceneManager()
   const game = new GameScene()

   stage.addChild(game)

   scenes.register(GameScene.NAME, game)

   scenes.firstState(GameScene.NAME)
}