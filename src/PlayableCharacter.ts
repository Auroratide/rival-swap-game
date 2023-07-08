import { Graphics, Sprite } from "pixi.js"

export class PlayableCharacter extends Sprite {
	private graphics = new Graphics()

	constructor() {
		super()

		this.draw()
		this.addChild(this.graphics)
	}

	private draw = () => {
		this.graphics.beginFill(0xaa0000)
		this.graphics.drawCircle(0, 0, 20)
		this.graphics.endFill()
	}
}