import { Graphics, IDestroyOptions, Sprite, Ticker } from "pixi.js"
import { Velocity } from "./Velocity"

export class ShockOrb extends Sprite {
	private graphics = new Graphics()
	private velocity: Velocity

	constructor(ticker: Ticker) {
		super()

		this.draw()
		this.addChild(this.graphics)

		this.velocity = new Velocity(ticker, this, { x: 10, y: 0 })
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.velocity.destroy()
		super.destroy(options)
	}

	private draw = () => {
		this.graphics.beginFill(0x00ff00)
		this.graphics.drawCircle(0, 0, 15)
		this.graphics.endFill()
	}
}
