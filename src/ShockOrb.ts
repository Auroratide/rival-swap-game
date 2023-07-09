import { IDestroyOptions, Sprite, Ticker } from "pixi.js"
import { Velocity } from "./Velocity"
import { TurretGroup } from "./Turret"
import { BigEnemy } from "./BigEnemy"
import { CONFIG } from "./config"
import { Score } from "./Score"
import { Assets } from "./assets"

export class ShockOrb extends Sprite {
	static DAMAGE = CONFIG.lightningDamage

	private velocity: Velocity
	private checkCollisionsWithTurrets: () => void
	private checkCollisionsWithEnemy: () => void

	constructor(private ticker: Ticker, private turretGroup: TurretGroup, enemy: BigEnemy, private score: Score, assets: Assets) {
		super()

		const sprite = new Sprite(assets.shockOrb.idle)
		sprite.anchor.set(0.5)
		sprite.scale.set(CONFIG.spriteScale)
		this.addChild(sprite)

		this.velocity = new Velocity(ticker, this, { x: CONFIG.lightningVelocity, y: 0 })

		this.checkCollisionsWithTurrets = turretGroup.onCollision(this, (turret) => {
			this.destroy()
			this.turretGroup.destroyTurret(turret)
		})

		this.checkCollisionsWithEnemy = enemy.onCollision(this, (head) => {
			this.destroy()
			const actualDamageDealt = head.damage(ShockOrb.DAMAGE)
			this.score.addMagicPoints(actualDamageDealt)
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
}
