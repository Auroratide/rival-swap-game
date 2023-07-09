import { Sprite, Ticker, IDestroyOptions } from "pixi.js"
import { Velocity } from "./Velocity"
import { TurretGroup } from "./Turret"
import { BigEnemy } from "./BigEnemy"
import { CONFIG } from "./config"
import { Score } from "./Score"
import { Assets } from "./assets"
import { ScreenFlash } from "./ScreenFlash"

export class CallLightning extends Sprite {
	static MAIN_DAMAGE = CONFIG.lightningDamage * 2
	static SIDE_DAMAGE = this.MAIN_DAMAGE / 2

	private velocity: Velocity
	private checkCollisionsWithTurrets: () => void
	private checkCollisionsWithHeads: () => void

	constructor(private ticker: Ticker, private turretGroup: TurretGroup, private enemy: BigEnemy, private score: Score, private assets: Assets, private screenFlash: ScreenFlash) {
		super()

		this.velocity = new Velocity(ticker, this, { x: CONFIG.callLightningVelocity, y: 0 })

		this.checkCollisionsWithTurrets = turretGroup.onCollision(this, (turret) => {
			this.flash()

			this.turretGroup.getAdjacentTurrets(turret).forEach((turret) => {
				this.turretGroup.destroyTurret(turret)
			})

			this.destroy()
			this.turretGroup.destroyTurret(turret)

		})

		this.checkCollisionsWithHeads = enemy.onCollision(this, (head) => {
			this.flash()
			this.destroy()

			this.enemy.getAdjacentHeads(head).forEach((head) => {
				const actualDamageDealt = head.damage(CallLightning.SIDE_DAMAGE)
				this.score.addMagicPoints(actualDamageDealt)
			})
			const actualDamageDealt = head.damage(CallLightning.MAIN_DAMAGE)
			this.score.addMagicPoints(actualDamageDealt)
		})

		const sprite = new Sprite(assets.callLightning.idle)
		sprite.anchor.set(0.5)
		sprite.scale.set(CONFIG.spriteScale)
		this.addChild(sprite)

		this.ticker.add(this.checkCollisionsWithTurrets)
		this.ticker.add(this.checkCollisionsWithHeads)
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.velocity.destroy()
		this.ticker.remove(this.checkCollisionsWithTurrets)
		this.ticker.remove(this.checkCollisionsWithHeads)
		super.destroy(options)
	}

	private flash = () => {
		const bolt = new Sprite(this.assets.callLightning.bolt)
		bolt.anchor.set(0.5, 0.95)
		bolt.scale.set(CONFIG.spriteScale * 2)
		bolt.position.set(this.x + 75, this.y)
		this.parent?.addChild(bolt)

		let delayCount = 0
		const removeAfterDelay = () => {
			if (delayCount++ > 4) {
				this.removeChild(bolt)
				bolt.destroy()

				this.ticker.remove(removeAfterDelay)
			}
		}

		this.ticker.add(removeAfterDelay)

		this.screenFlash.flash()
	}
}