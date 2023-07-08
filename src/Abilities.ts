import { Container, DisplayObject, Ticker } from "pixi.js"
import { ShockOrb } from "./ShockOrb"
import { TurretGroup } from "./Turret"
import { Field } from "./Field"
import { GridLockedMovement } from "./GridLockedMovement"
import { vectorAdd } from "./math"
import { Cooldown } from "./Cooldown"
import { BigEnemy } from "./BigEnemy"

export interface Abilities {
	readonly fireCooldown: Cooldown
	fire: () => void
}

export class MagicAbilities implements Abilities {
	readonly fireCooldown: Cooldown

	constructor(
		private user: DisplayObject,
		private ticker: Ticker,
		private stage: Container,
		private turretGroup: TurretGroup,
		private enemy: BigEnemy
	) {
		this.fireCooldown = new Cooldown(ticker, 50)
	}

	fire = () => {
		if (!this.fireCooldown.isOnCooldown()) {
			const orb = new ShockOrb(this.ticker, this.turretGroup, this.enemy)
			orb.position.x = this.user.position.x
			orb.position.y = this.user.position.y
	
			this.stage.addChild(orb)

			this.fireCooldown.trigger()
		}
	}
}

export class TechAbilities implements Abilities {
	readonly fireCooldown: Cooldown

	constructor(
		private user: GridLockedMovement,
		private field: Field,
		private stage: Container,
		private allTurrets: TurretGroup,
		ticker: Ticker
	) {
		this.fireCooldown = new Cooldown(ticker, 75)
	}

	fire = () => {
		if (!this.fireCooldown.isOnCooldown()) {
			const targetPosition = vectorAdd(this.user.position, { x: 1, y: 0 })

			if (!this.allTurrets.isTurretAt(targetPosition)) {
				const turret = this.allTurrets.createNew(this.field, targetPosition)
				this.stage.addChild(turret)
	
				this.fireCooldown.trigger()
			}
		}
	}
}
