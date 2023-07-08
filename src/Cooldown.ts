import { Ticker, Graphics, IDestroyOptions } from "pixi.js"

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

export class CooldownIndicator extends Graphics {
	constructor(private cooldown: Cooldown, private ticker: Ticker) {
		super()

		this.draw()
		this.ticker.add(this.draw)
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.ticker.remove(this.draw)
		super.destroy(options)
	}

	private draw = () => {
		this.clear()
		if (this.cooldown.isOnCooldown()) {
			this.beginFill(0xff0000)
			this.moveTo(0, 0)
			this.arc(0, 0, 20, 0, 2 * Math.PI * this.cooldown.progress(), false)
			this.lineTo(0, 0)
			this.endFill()
		}
	}
}