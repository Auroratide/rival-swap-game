import { Ticker, IDestroyOptions } from "pixi.js"
import { CircularIndicator } from "./CircularIndicator"

export class Cooldown {
	protected currentTicks: number

	constructor(protected ticker: Ticker, private duration: number, startingTicks = 0) {
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

	protected tickDown = (dt: number) => {
		this.currentTicks -= dt
		if (this.currentTicks <= 0) {
			this.ticker.remove(this.tickDown)
		}
	}
}

export class RandomizedCooldown extends Cooldown {
	constructor(ticker: Ticker, private min: number, private max: number) {
		super(ticker, max, Math.random() * (max - min) + min)
	}

	trigger = () => {
		this.currentTicks = Math.random() * (this.max - this.min) + this.min
		this.ticker.add(this.tickDown)
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