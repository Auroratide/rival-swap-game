import { Container, DisplayObject, Ticker } from "pixi.js"
import { ShockOrb } from "./ShockOrb"
import { Turret } from "./Turret"
import { Field } from "./Field"
import { GridLockedMovement } from "./GridLockedMovement"
import { vectorAdd } from "./math"
import { Cooldown } from "./Cooldown"

export interface Abilities {
	fire: () => void
}

export class MagicAbilities implements Abilities {
	readonly fireCooldown: Cooldown

	constructor(
		private user: DisplayObject,
		private ticker: Ticker,
		private stage: Container
	) {
		this.fireCooldown = new Cooldown(ticker, 50)
	}

	fire = () => {
		if (!this.fireCooldown.isOnCooldown()) {
			const orb = new ShockOrb(this.ticker)
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
		ticker: Ticker
	) {
		this.fireCooldown = new Cooldown(ticker, 75)
	}

	fire = () => {
		if (!this.fireCooldown.isOnCooldown()) {
			const turret = new Turret()
			const gridLocked = new GridLockedMovement(this.field, turret)
			gridLocked.moveTo(vectorAdd(this.user.position, { x: 1, y: 0 }))

			this.stage.addChild(turret)

			this.fireCooldown.trigger()
		}
	}
}
