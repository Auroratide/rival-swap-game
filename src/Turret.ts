import { DisplayObject, Graphics, IDestroyOptions, Sprite, Ticker } from "pixi.js"
import { GridLockedMovement } from "./GridLockedMovement"
import { Vector2, vectorEquals } from "./math"
import { Field } from "./Field"
import { isColliding } from "./isColliding"
import { Velocity } from "./Velocity"
import { Cooldown } from "./Cooldown"
import { BigEnemy } from "./BigEnemy"
import { CONFIG } from "./config"
import { Score } from "./Score"

export class Turret extends Sprite {
	private graphics = new Graphics()
	private shootCooldown: Cooldown

	constructor(private ticker: Ticker, private enemy: BigEnemy, private score: Score) {
		super()

		this.draw()
		this.addChild(this.graphics)

		this.shootCooldown = new Cooldown(ticker, 50, 50)
		this.ticker.add(this.shoot)
	}

	private shoot = () => {
		if (!this.shootCooldown.isOnCooldown()) {
			const bullet = new TurretBullet(this.ticker, this.enemy, this.score)
			bullet.position = this.position
			this.parent?.addChild(bullet)

			this.shootCooldown.trigger()
		}
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.ticker.remove(this.shoot)
		super.destroy(options)
	}

	private draw = () => {
		this.graphics.beginFill(0x00aa00)
		this.graphics.drawRect(-15, -15, 30, 30)
		this.graphics.endFill()
	}
}

export class TurretBullet extends Sprite {
	static DAMAGE = CONFIG.turretDamage

	private graphics = new Graphics()
	private velocity: Velocity
	private checkCollisionsWithEnemy: () => void

	constructor(private ticker: Ticker, enemy: BigEnemy, private score: Score) {
		super()

		this.velocity = new Velocity(ticker, this, { x: CONFIG.turretVelocity, y: 0 })

		this.checkCollisionsWithEnemy = enemy.onCollision(this, (head) => {
			this.destroy()
			const actualDamageDealt = head.damage(TurretBullet.DAMAGE)
			this.score.addTechPoints(actualDamageDealt)
		})

		this.draw()
		this.addChild(this.graphics)

		this.ticker.add(this.checkCollisionsWithEnemy)
	}

	destroy = () => {
		this.velocity.destroy()
		this.ticker.remove(this.checkCollisionsWithEnemy)
		super.destroy()
	}

	private draw = () => {
		this.graphics.beginFill(0x00ff00)
		this.graphics.drawRect(0, -2.5, 10, 5)
		this.graphics.endFill()
	}
}

export class TurretGroup {
	private turrets = new Map<Turret, GridLockedMovement>()

	constructor(private ticker: Ticker, private enemy: BigEnemy, private score: Score) {}

	createNew = (field: Field, position: Vector2): Turret => {
		const turret = new Turret(this.ticker, this.enemy, this.score)
		const gridLocked = new GridLockedMovement(field, turret)
		gridLocked.moveTo(position)

		this.turrets.set(turret, gridLocked)

		return turret
	}

	isTurretAt = (position: Vector2): boolean => {
		for (const turret of this.turrets.values()) {
			if (vectorEquals(turret.position, position)) {
				return true
			}
		}

		return false
	}

	onCollision = <T extends DisplayObject>(withObject: T, fn: (turret: Turret, object: T) => void) => {
		return () => {
			for (const turret of this.turrets.keys()) {
				if (isColliding(turret, withObject)) {
					fn(turret, withObject)
					break
				}
			}
		}
	}

	getAdjacentTurrets = (turret: Turret): Turret[] => {
		const adjacentTurrets: Turret[] = []

		for (const [otherTurret, gridded] of this.turrets.entries()) {
			if (gridded.isAdjacentTo(this.turrets.get(turret)!.position)) {
				adjacentTurrets.push(otherTurret)
			}
		}

		return adjacentTurrets
	}

	obstacles = (): GridLockedMovement[] => Array.from(this.turrets.values())

	destroyTurret = (turret: Turret) => {
		this.turrets.delete(turret)
		turret.destroy()
	}
}