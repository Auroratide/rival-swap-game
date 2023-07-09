import { Application } from "pixi.js"
import { setup } from "./setup"
import { CONFIG } from "./config"
import { loadAllAssets } from "./assets"

function start() {
   const app = new Application({
      view: document.getElementById('game') as HTMLCanvasElement,
      width: CONFIG.width,
      height: CONFIG.height,
		backgroundColor: 0x111111,
      antialias: true,
   })

	loadAllAssets().then((assets) => {
		setup(app.stage, app.ticker, app.renderer as any, assets)
	})

}

start()
