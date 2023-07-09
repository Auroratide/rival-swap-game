import { Application } from "pixi.js"
import { setup } from "./setup"
import { CONFIG } from "./config"
import { loadAllAssets } from "./assets"
import * as WebFont from "webfontloader"

WebFont.load({
	google: {
		families: [CONFIG.font],
	},
	fontloading: () => {
		const el = document.createElement('p')
		el.style.fontFamily = CONFIG.font,
		el.style.fontSize = "0"
		el.style.visibility = "hidden"
		el.innerHTML = "."
  
		document.body.appendChild(el)
	},
	active: () => setTimeout(start, 100),
})

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
