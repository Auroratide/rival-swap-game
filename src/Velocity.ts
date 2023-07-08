import { DisplayObject, Ticker } from "pixi.js"
import { Vector2 } from "./math"

export class Velocity {
	constructor(private ticker: Ticker, private object: DisplayObject, public value: Vector2 = { x: 0, y: 0 }) {
		this.ticker.add(this.tick)
	}

	destroy = () => {
		this.ticker.remove(this.tick)
	}

	private tick = (dt: number) => {
		this.object.position.x += dt * this.value.x
		this.object.position.y += dt * this.value.y
	}
}
