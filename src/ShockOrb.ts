import { Graphics, IDestroyOptions, Sprite, Ticker } from "pixi.js"
import { Velocity } from "./Velocity"
import { TurretGroup } from "./Turret"

export class ShockOrb extends Sprite {
	private graphics = new Graphics()
	private velocity: Velocity
	private checkCollisionsWithTurrets: () => void

	constructor(private ticker: Ticker, private turretGroup: TurretGroup) {
		super()

		this.draw()
		this.addChild(this.graphics)

		this.velocity = new Velocity(ticker, this, { x: 10, y: 0 })

		this.checkCollisionsWithTurrets = turretGroup.onCollision(this, (turret) => {
			this.destroy()
			this.turretGroup.destroyTurret(turret)
		})

		this.ticker.add(this.checkCollisionsWithTurrets)
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.velocity.destroy()
		this.ticker.remove(this.checkCollisionsWithTurrets)
		super.destroy(options)
	}

	private draw = () => {
		this.graphics.beginFill(0xff00ff)
		this.graphics.drawCircle(0, 0, 15)
		this.graphics.endFill()
	}
}
