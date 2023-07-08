import { Container, Graphics, Ticker } from "pixi.js"
import { Abilities } from "./Abilities"
import { PlainText } from "./PlainText"
import { CooldownIndicator } from "./Cooldown"

export class CharacterUi extends Container {
	private graphics = new Graphics()

	constructor(private characterName: string, private abilities: Abilities, ticker: Ticker) {
		super()

		const portrait = new Graphics()
		portrait.beginFill(0x999999)
		portrait.drawCircle(0, 0, 40)
		portrait.endFill()

		const text = new PlainText(characterName)
		text.position.set(50, -25)

		const cooldownIcon = new Graphics()
		cooldownIcon.beginFill(0x2222ff)
		cooldownIcon.drawCircle(0, 0, 15)
		cooldownIcon.endFill()
		cooldownIcon.position.set(65, 25)

		const cooldownIndicator = new CooldownIndicator(abilities.fireCooldown, ticker)
		cooldownIndicator.position.set(65, 25)

		this.addChild(portrait)
		this.addChild(text)
		this.addChild(cooldownIndicator)
		this.addChild(cooldownIcon)
	}

	private draw = () => {
		// this.graphics.dra
	}
}