import { DisplayObject, Ticker } from "pixi.js"

export class Tween {
	private transformations: { key: keyof DisplayObject, target: number }[] = []
	private secondsToRun = 0
	private doOnFinish = () => {}

	constructor(private obj: DisplayObject) {}

	// numeric properties only
	property = (key: keyof DisplayObject, target: number) => {
		this.transformations.push({ key, target })
		return this
	}

	time = (seconds: number) => {
		this.secondsToRun = seconds
		return this
	}

	onFinish = (fn: () => void) => {
		this.doOnFinish = fn
		return this
	}

	start = (ticker: Ticker) => {
		const startValues = this.transformations.map(t => this.obj[t.key] as number)

		let timeElapsed = 0
		const f = (dt: number) => {
			// console.log(dt)
			// console.log(Ticker.shared.elapsedMS)
			timeElapsed += dt * Ticker.shared.elapsedMS / 1000
			const t = timeElapsed / this.secondsToRun

			for (let i = 0; i < this.transformations.length; i++) {
				const { key, target } = this.transformations[i]
				;(this.obj as any)[key] = startValues[i] + t * (target - startValues[i])
			}

			if (t >= 1) {
				ticker.remove(f)
				this.doOnFinish()
			}
		}

		ticker.add(f)
	}
}
