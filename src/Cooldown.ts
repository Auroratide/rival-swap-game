import { Ticker } from "pixi.js"

export class Cooldown {
	private currentTicks = 0

	constructor(private ticker: Ticker, private duration: number) {}

	isOnCooldown = () => this.currentTicks > 0

	trigger = () => {
		this.currentTicks = this.duration
		this.ticker.add(this.tickDown)
	}

	private tickDown = (dt: number) => {
		this.currentTicks -= dt
		if (this.currentTicks <= 0) {
			this.ticker.remove(this.tickDown)
		}
	}
}