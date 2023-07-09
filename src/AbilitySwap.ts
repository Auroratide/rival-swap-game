import { Ticker } from "pixi.js"
import { Abilities } from "./Abilities"
import { AbilityController } from "./AbilityController"
import { Cooldown } from "./Cooldown"
import { MAGIC_GIRL_KEYS, TECH_GUY_KEYS } from "./PlayerControls"
import { CONFIG } from "./config"
import { Story } from "./story/Story"
import { ScreenFlash } from "./ScreenFlash"

export class AbilitySwap {
	private abilityControllers: AbilityController[] = []
	readonly cooldown: Cooldown
	private currentIndex = 0

	constructor(
		private techGuyAbilities: Abilities[],
		private magicGirlAbilities: Abilities[],
		private ticker: Ticker,
		private story: Story,
		private screenFlash: ScreenFlash
	) {
		this.cooldown = new Cooldown(ticker, CONFIG.cooldowns.abilitySwap, CONFIG.cooldowns.abilitySwap)
		this.ticker.add(this.tick)
	}

	areSwapped = () => this.currentIndex > 0

	start = () => {
		const techController = new AbilityController(this.techGuyAbilities[this.currentIndex], TECH_GUY_KEYS)
		const magicController = new AbilityController(this.magicGirlAbilities[this.currentIndex], MAGIC_GIRL_KEYS)

		this.abilityControllers = [techController, magicController]
	}

	swap = () => {
		this.screenFlash.flash({
			intensity: 0.4,
			color: 0xccaaff,
		})

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
			if (this.story.playTheTutorial) {
				this.story.parent?.addChild(this.story) // hack to put it on top; I've stopped caring about code quality
				this.ticker.stop()
				this.story.startMidwayStory(() => {
					this.ticker.start()
				})
			}
		}
	}

	destroy = () => {
		this.abilityControllers.forEach(abilityController => abilityController.destroy())
		this.abilityControllers = []
		this.ticker.remove(this.tick)
	}
}