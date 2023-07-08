import { DisplayObject, Graphics, Sprite } from "pixi.js"
import { GridLockedMovement } from "./GridLockedMovement"
import { Vector2, vectorEquals } from "./math"
import { Field } from "./Field"
import { isColliding } from "./isColliding"

export class Turret extends Sprite {
	private graphics = new Graphics()

	constructor() {
		super()

		this.draw()
		this.addChild(this.graphics)
	}

	private draw = () => {
		this.graphics.beginFill(0x00aa00)
		this.graphics.drawRect(-15, -15, 30, 30)
		this.graphics.endFill()
	}
}

export class TurretGroup {
	private turrets = new Map<Turret, GridLockedMovement>()

	createNew = (field: Field, position: Vector2): Turret => {
		const turret = new Turret()
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
				}
			}
		}
	}

	destroyTurret = (turret: Turret) => {
		this.turrets.delete(turret)
		turret.destroy()
	}
}