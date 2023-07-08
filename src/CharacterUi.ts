import { Container, Graphics, IDestroyOptions, Ticker } from "pixi.js"
import { Abilities } from "./Abilities"
import { PlainText } from "./PlainText"
import { Cooldown, CooldownIndicator } from "./Cooldown"

export class CharacterUi extends Container {
	private readonly scoreText: PlainText

	constructor(characterName: string, abilities: Abilities[], private ticker: Ticker, private getScore: () => number) {
		super()

		const portrait = new Graphics()
		portrait.beginFill(0x999999)
		portrait.drawCircle(0, 0, 40)
		portrait.endFill()

		const text = new PlainText(characterName, {
			size: 24,
			color: 0xffffff,
		})
		text.position.set(50, -25)

		this.scoreText = new PlainText("0", {
			color: 0xffffff,
		})
		this.scoreText.position.set(150, 20)

		const fireAbility = this.abilityIcon(abilities.map((it) => it.fireCooldown), ticker)
		fireAbility.position.set(65, 25)

		const specialAbility = this.abilityIcon(abilities.map((it) => it.specialCooldown), ticker)
		specialAbility.position.set(115, 25)

		this.addChild(portrait)
		this.addChild(text)
		this.addChild(this.scoreText)
		this.addChild(fireAbility)
		this.addChild(specialAbility)

		this.ticker.add(this.updateScore)
	}

	private abilityIcon = (cooldowns: Cooldown[], ticker: Ticker) => {
		const iconContainer = new Container()

		const cooldownIcon = new Graphics()
		cooldownIcon.beginFill(0x2222ff)
		cooldownIcon.drawCircle(0, 0, 15)
		cooldownIcon.endFill()

		cooldowns.forEach((cooldown) => {
			const cooldownIndicator = new CooldownIndicator(cooldown, ticker)
			iconContainer.addChild(cooldownIndicator)
		})

		iconContainer.addChild(cooldownIcon)

		return iconContainer
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.ticker.remove(this.updateScore)
		super.destroy(options)
	}

	private updateScore = () => {
		this.scoreText.text = this.getScore().toString()
	}
}