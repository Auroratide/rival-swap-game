import { Ticker, IDestroyOptions } from "pixi.js"
import { CircularIndicator } from "./CircularIndicator"

export class Cooldown {
	private currentTicks: number

	constructor(private ticker: Ticker, private duration: number, startingTicks = 0) {
		this.currentTicks = startingTicks
		if (this.currentTicks > 0) {
			this.ticker.add(this.tickDown)
		}
	}

	progress = () => this.currentTicks / this.duration

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

export class CooldownIndicator extends CircularIndicator {
	constructor(private cooldown: Cooldown, private ticker: Ticker) {
		super(20)

		this.drawTick()
		this.ticker.add(this.drawTick)
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.ticker.remove(this.draw)
		super.destroy(options)
	}

	private drawTick = () => {
		this.clear()
		if (this.cooldown.isOnCooldown()) {
			this.draw(this.cooldown.progress())
		}
	}
}