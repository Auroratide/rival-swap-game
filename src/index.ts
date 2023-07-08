import { Application } from "pixi.js"
import { setup } from "./setup"

function start() {
   const app = new Application({
      view: document.getElementById('game') as HTMLCanvasElement,
      width: 1100,
      height: 900,
      antialias: true,
   })

   setup(app.stage, app.ticker)
}

start()
