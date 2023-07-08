import { SceneManager } from "./Scene"
import { GameScene } from "./GameScene"
import { Container, Ticker } from "pixi.js"

export const setup = (stage: Container, ticker: Ticker) => {
   const scenes = new SceneManager()
   const game = new GameScene(ticker)

   stage.addChild(game)

   scenes.register(GameScene.NAME, game)

   scenes.firstState(GameScene.NAME)
}