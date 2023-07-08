import { Graphics, Sprite } from "pixi.js"

export type FieldOptions = {
	width: number
	height: number
	unitWidth: number
}

export type FieldDimensions = {
	width: number
	height: number
	unitWidth: number
}

export class Field extends Sprite {
	private graphics = new Graphics()
	readonly gridSize: FieldDimensions

	constructor(options: FieldOptions) {
		super()

		this.gridSize = {
			width: options.width,
			height: options.height,
			unitWidth: options.unitWidth
		}

		this.draw()

		this.addChild(this.graphics)
	}

	private draw = () => {
		for (let x = 0; x < this.gridSize.width; x++) {
			for (let y = 0; y < this.gridSize.height; y++) {
				this.graphics.beginFill(0x333333)
				this.graphics.drawRect(x * this.gridSize.unitWidth + 2, y * this.gridSize.unitWidth + 2, this.gridSize.unitWidth - 2, this.gridSize.unitWidth - 2)
				this.graphics.endFill()
			}
		}
	}
}
