import { Graphics, Sprite } from "pixi.js"

export class Turret extends Sprite {
	private graphics = new Graphics()

	constructor() {
		super()

		this.draw()
		this.addChild(this.graphics)
	}

	private draw = () => {
		this.graphics.beginFill(0x00aa00)
		this.graphics.drawRect(-15, -15, 30, 30)
		this.graphics.endFill()
	}
}