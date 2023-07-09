import { Container, Graphics, Renderer, Ticker } from "pixi.js"

export type FlashOptions = {
	intensity?: number
	count?: number
	color?: number
}

export class ScreenFlash extends Container {
	private graphics = new Graphics()

	constructor(private renderer: Renderer, private ticker: Ticker) {
		super()
		this.alpha = 0
		this.graphics.beginFill(0xffffff)
		this.graphics.drawRect(0, 0, this.renderer.width, this.renderer.height)
		this.graphics.endFill()
		this.addChild(this.graphics)
	}

	flash = ({
		intensity = 0.5,
		color = 0xffffff,
	} = {}) => {
		this.alpha = intensity

		this.graphics.clear()
		this.graphics.beginFill(color)
		this.graphics.drawRect(0, 0, this.renderer.width, this.renderer.height)
		this.graphics.endFill()

		this.ticker.add(this.fade)
	}

	private fade = () => {
		this.alpha -= 0.1

		if (this.alpha <= 0) {
			this.ticker.remove(this.fade)
		}
	}
}