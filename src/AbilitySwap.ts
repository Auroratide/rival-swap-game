import { Ticker } from "pixi.js"
import { Abilities } from "./Abilities"
import { AbilityController } from "./AbilityController"
import { Cooldown } from "./Cooldown"
import { MAGIC_GIRL_KEYS, TECH_GUY_KEYS } from "./PlayerControls"

export class AbilitySwap {
	private abilityControllers: AbilityController[] = []
	private cooldown: Cooldown
	private currentIndex = 0

	constructor(
		private techGuyAbilities: Abilities[],
		private magicGirlAbilities: Abilities[],
		private ticker: Ticker
	) {
		this.cooldown = new Cooldown(ticker, 1200, 1200)
		this.ticker.add(this.tick)
	}

	areSwapped = () => this.currentIndex > 0

	start = () => {
		const techController = new AbilityController(this.techGuyAbilities[this.currentIndex], TECH_GUY_KEYS)
		const magicController = new AbilityController(this.magicGirlAbilities[this.currentIndex], MAGIC_GIRL_KEYS)

		this.abilityControllers = [techController, magicController]
	}

	swap = () => {
		this.abilityControllers.forEach(abilityController => abilityController.destroy())

		this.currentIndex = (this.currentIndex + 1) % this.techGuyAbilities.length

		const techController = new AbilityController(this.techGuyAbilities[this.currentIndex], TECH_GUY_KEYS)
		const magicController = new AbilityController(this.magicGirlAbilities[this.currentIndex], MAGIC_GIRL_KEYS)

		this.abilityControllers = [techController, magicController]

		this.cooldown.trigger()
	}

	private tick = () => {
		if (!this.cooldown.isOnCooldown()) {
			this.swap()
		}
	}

	destroy = () => {
		this.abilityControllers.forEach(abilityController => abilityController.destroy())
		this.abilityControllers = []
		this.ticker.remove(this.tick)
	}
}