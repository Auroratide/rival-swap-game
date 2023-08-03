import { SceneManager } from "./Scene"
import { GameScene } from "./GameScene"
import { Container, Renderer, Ticker } from "pixi.js"
import { Assets } from "./assets"
import { SoundManager } from "./SoundManager"

export const setup = (stage: Container, ticker: Ticker, renderer: Renderer, assets: Assets) => {
   const scenes = new SceneManager()
	const sfx = new SoundManager(assets)
   const game = new GameScene(ticker, renderer, assets, sfx)

   stage.addChild(game)

   scenes.register(GameScene.NAME, game)

   scenes.firstState(GameScene.NAME)
}