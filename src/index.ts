import { Application } from "pixi.js"
import { setup } from "./setup"

function start() {
   const app = new Application({
      view: document.getElementById('game') as HTMLCanvasElement,
      width: 1200,
      height: 820,
		backgroundColor: 0x111111,
      antialias: true,
   })

   setup(app.stage, app.ticker)
}

start()
