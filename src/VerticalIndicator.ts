import { Graphics } from "pixi.js"

export class VerticalIndicator extends Graphics {
	constructor(private indicatorHeight: number) {
		super()
	}

	// [0..1]
	draw = (progress: number) => {
		this.clear()

		this.beginFill(0x633662)
		this.drawRect(0, 0, 10, this.indicatorHeight)
		this.endFill()

		this.beginFill(0xbd515a)
		this.drawRect(0, this.indicatorHeight * (1 - progress), 10, this.indicatorHeight * progress)
		this.endFill()
	}
}