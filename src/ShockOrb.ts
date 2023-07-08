import { Graphics, IDestroyOptions, Sprite, Ticker } from "pixi.js"
import { Velocity } from "./Velocity"
import { TurretGroup } from "./Turret"
import { BigEnemy } from "./BigEnemy"

export class ShockOrb extends Sprite {
	static DAMAGE = 12

	private graphics = new Graphics()
	private velocity: Velocity
	private checkCollisionsWithTurrets: () => void
	private checkCollisionsWithEnemy: () => void

	constructor(private ticker: Ticker, private turretGroup: TurretGroup, enemy: BigEnemy) {
		super()

		this.draw()
		this.addChild(this.graphics)

		this.velocity = new Velocity(ticker, this, { x: 10, y: 0 })

		this.checkCollisionsWithTurrets = turretGroup.onCollision(this, (turret) => {
			this.destroy()
			this.turretGroup.destroyTurret(turret)
		})

		this.checkCollisionsWithEnemy = enemy.onCollision(this, (head) => {
			this.destroy()
			head.damage(ShockOrb.DAMAGE)
		})

		this.ticker.add(this.checkCollisionsWithTurrets)
		this.ticker.add(this.checkCollisionsWithEnemy)
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.velocity.destroy()
		this.ticker.remove(this.checkCollisionsWithTurrets)
		this.ticker.remove(this.checkCollisionsWithEnemy)
		super.destroy(options)
	}

	private draw = () => {
		this.graphics.beginFill(0xff00ff)
		this.graphics.drawCircle(0, 0, 15)
		this.graphics.endFill()
	}
}
