import { SceneManager } from "./Scene"
import { GameScene } from "./GameScene"
import { Container, Renderer, Ticker } from "pixi.js"

export const setup = (stage: Container, ticker: Ticker, renderer: Renderer) => {
   const scenes = new SceneManager()
   const game = new GameScene(ticker, renderer)

   stage.addChild(game)

   scenes.register(GameScene.NAME, game)

   scenes.firstState(GameScene.NAME)
}