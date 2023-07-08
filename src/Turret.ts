import { DisplayObject, Graphics, IDestroyOptions, Sprite, Ticker } from "pixi.js"
import { GridLockedMovement } from "./GridLockedMovement"
import { Vector2, vectorEquals } from "./math"
import { Field } from "./Field"
import { isColliding } from "./isColliding"
import { Velocity } from "./Velocity"
import { Cooldown } from "./Cooldown"

export class Turret extends Sprite {
	private graphics = new Graphics()
	private shootCooldown: Cooldown

	constructor(private ticker: Ticker) {
		super()

		this.draw()
		this.addChild(this.graphics)

		this.shootCooldown = new Cooldown(ticker, 50, 50)
		this.ticker.add(this.shoot)
	}

	private shoot = () => {
		if (!this.shootCooldown.isOnCooldown()) {
			const bullet = new TurretBullet(this.ticker)
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
	private graphics = new Graphics()
	private velocity: Velocity

	constructor(ticker: Ticker) {
		super()

		this.velocity = new Velocity(ticker, this, { x: 10, y: 0 })

		this.draw()
		this.addChild(this.graphics)
	}

	destroy = () => {
		this.velocity.destroy()
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

	constructor(private ticker: Ticker) {}

	createNew = (field: Field, position: Vector2): Turret => {
		const turret = new Turret(this.ticker)
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

	destroyTurret = (turret: Turret) => {
		this.turrets.delete(turret)
		turret.destroy()
	}
}