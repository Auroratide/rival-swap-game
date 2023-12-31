import { Container, DisplayObject, Ticker } from "pixi.js"
import { ShockOrb } from "./ShockOrb"
import { TurretGroup } from "./Turret"
import { Field } from "./Field"
import { GridLockedMovement } from "./GridLockedMovement"
import { vectorAdd } from "./math"
import { Cooldown } from "./Cooldown"
import { BigEnemy } from "./BigEnemy"
import { CallLightning } from "./CallLightning"
import { Score } from "./Score"
import { CONFIG } from "./config"
import { Assets } from "./assets"
import { ScreenFlash } from "./ScreenFlash"

export interface Abilities {
	readonly fireCooldown: Cooldown
	fire: () => void

	readonly specialCooldown: Cooldown
	special: () => void
}

export class MagicAbilities implements Abilities {
	readonly fireCooldown: Cooldown
	readonly specialCooldown: Cooldown

	constructor(
		private user: DisplayObject,
		private ticker: Ticker,
		private stage: Container,
		private turretGroup: TurretGroup,
		private enemy: BigEnemy,
		private score: Score,
		private assets: Assets,
		private screenFlash: ScreenFlash
	) {
		this.fireCooldown = new Cooldown(ticker, CONFIG.cooldowns.shockOrb)
		this.specialCooldown = new Cooldown(ticker, CONFIG.cooldowns.callLightning)
	}

	fire = () => {
		if (!this.fireCooldown.isOnCooldown()) {
			const orb = new ShockOrb(this.ticker, this.turretGroup, this.enemy, this.score, this.assets)
			orb.position.x = this.user.position.x
			orb.position.y = this.user.position.y
	
			this.stage.addChild(orb)

			this.fireCooldown.trigger()
		}
	}

	special = () => {
		if (!this.specialCooldown.isOnCooldown()) {
			const callLightning = new CallLightning(this.ticker, this.turretGroup, this.enemy, this.score, this.assets, this.screenFlash)
			callLightning.position.x = this.user.position.x
			callLightning.position.y = this.user.position.y

			this.stage.addChild(callLightning)

			this.specialCooldown.trigger()
		}
	}
}

export class TechAbilities implements Abilities {
	readonly fireCooldown: Cooldown
	readonly specialCooldown: Cooldown

	constructor(
		private user: GridLockedMovement,
		private field: Field,
		private stage: Container,
		private allTurrets: TurretGroup,
		ticker: Ticker
	) {
		this.fireCooldown = new Cooldown(ticker, CONFIG.cooldowns.turret)
		this.specialCooldown = new Cooldown(ticker, CONFIG.cooldowns.wall)
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

	special = () => {
		if (!this.specialCooldown.isOnCooldown()) {
			
		}
	}
}
