import { Graphics, Sprite } from "pixi.js"

export class PlayableCharacter extends Sprite {
	private graphics = new Graphics()

	constructor(private color: number) {
		super()

		this.draw()
		this.addChild(this.graphics)
	}

	private draw = () => {
		this.graphics.beginFill(this.color)
		this.graphics.drawCircle(0, 0, 20)
		this.graphics.endFill()
	}
}