import { Application } from "pixi.js"
import { setup } from "./setup"

function start() {
   const app = new Application({
      view: document.getElementById('game') as HTMLCanvasElement,
      width: 960,
      height: 960,
      antialias: true,
   })

   setup(app.stage)
}

start()
