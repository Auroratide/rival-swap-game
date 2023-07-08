import { Sprite, Graphics, Ticker, IDestroyOptions } from "pixi.js"
import { Velocity } from "./Velocity"
import { TurretGroup } from "./Turret"
import { BigEnemy } from "./BigEnemy"
import { CONFIG } from "./config"
import { Score } from "./Score"

export class CallLightning extends Sprite {
	static MAIN_DAMAGE = CONFIG.lightningDamage * 2
	static SIDE_DAMAGE = this.MAIN_DAMAGE / 2

	private graphics = new Graphics()
	private velocity: Velocity
	private checkCollisionsWithTurrets: () => void
	private checkCollisionsWithHeads: () => void

	constructor(private ticker: Ticker, private turretGroup: TurretGroup, private enemy: BigEnemy, private score: Score) {
		super()

		this.velocity = new Velocity(ticker, this, { x: CONFIG.callLightningVelocity, y: 0 })

		this.checkCollisionsWithTurrets = turretGroup.onCollision(this, (turret) => {
			this.turretGroup.getAdjacentTurrets(turret).forEach((turret) => {
				this.turretGroup.destroyTurret(turret)
			})

			this.destroy()
			this.turretGroup.destroyTurret(turret)
		})

		this.checkCollisionsWithHeads = enemy.onCollision(this, (head) => {
			this.destroy()

			this.enemy.getAdjacentHeads(head).forEach((head) => {
				const actualDamageDealt = head.damage(CallLightning.SIDE_DAMAGE)
				this.score.addMagicPoints(actualDamageDealt)
			})
			const actualDamageDealt = head.damage(CallLightning.MAIN_DAMAGE)
			this.score.addMagicPoints(actualDamageDealt)
		})

		this.draw()
		this.addChild(this.graphics)
		this.ticker.add(this.checkCollisionsWithTurrets)
		this.ticker.add(this.checkCollisionsWithHeads)
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.velocity.destroy()
		this.ticker.remove(this.checkCollisionsWithTurrets)
		this.ticker.remove(this.checkCollisionsWithHeads)
		super.destroy(options)
	}

	private draw = () => {
		this.graphics.beginFill(0xff00ff)
		this.graphics.drawCircle(0, 0, 5)
		this.graphics.endFill()
	}
}