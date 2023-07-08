import { Graphics, Sprite } from "pixi.js"

export class BigEnemy extends Sprite {
	private graphics = new Graphics()

	constructor() {
		super()

		this.draw()
		this.addChild(this.graphics)
	}

	private draw = () => {
		this.graphics.beginFill(0xaa8800)
		this.graphics.drawRect(-50, -400, 200, 800)
		this.graphics.endFill()
	}
}
