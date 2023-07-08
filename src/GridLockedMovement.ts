import { DisplayObject } from "pixi.js"
import { Vector2, clamp } from "./math"
import { Field } from "./Field"

export class GridLockedMovement {
	readonly position: Vector2

	constructor(private field: Field, private object: DisplayObject) {
		this.position = {
			x: 0,
			y: 0
		}

		this.lock()
	}

	moveTo = (position: Vector2) => {
		this.position.x = position.x
		this.position.y = position.y

		this.lock()
	}

	moveBy = (amount: Vector2) => {
		this.position.x += amount.x
		this.position.y += amount.y

		this.position.x = clamp(0, this.position.x, this.field.gridSize.width - 1)
		this.position.y = clamp(0, this.position.y, this.field.gridSize.width - 1)

		this.lock()
	}

	private lock = () => {
		const w = this.field.gridSize.unitWidth
		this.object.position.x = this.position.x * w + w / 2
		this.object.position.y = this.position.y * w + w / 2
	}
}
