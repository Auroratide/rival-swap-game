import { Graphics } from "pixi.js"

export class CircularIndicator extends Graphics {
	constructor(private radius: number) {
		super()
	}

	// [0..1]
	draw = (progress: number) => {
		this.clear()
		this.beginFill(0xff0000)
		this.moveTo(0, 0)
		this.arc(0, 0, this.radius, 0, 2 * Math.PI * progress, false)
		this.lineTo(0, 0)
		this.endFill()
	}
}