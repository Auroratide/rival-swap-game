import { Container, Graphics, Ticker } from "pixi.js"
import { PlainText } from "./PlainText"
import { Cooldown, CooldownIndicator } from "./Cooldown"

export class EnemyUi extends Container {
	constructor(characterName: string, cooldown: Cooldown, ticker: Ticker) {
		super()

		const portrait = new Graphics()
		portrait.beginFill(0xbb9999)
		portrait.drawCircle(0, 0, 40)
		portrait.endFill()
		portrait.position.set(220, 0)

		const text = new PlainText(characterName, {
			size: 24,
			color: 0xffffff,
			align: "right",
			width: 200,
		})
		text.position.set(0, -25)

		const fireAbility = this.abilityIcon([cooldown], ticker)
		fireAbility.position.set(150, 25)

		this.addChild(portrait)
		this.addChild(text)
		this.addChild(fireAbility)
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
}