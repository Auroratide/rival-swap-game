import { Container, Graphics, Ticker } from "pixi.js"
import { Abilities } from "./Abilities"
import { PlainText } from "./PlainText"
import { Cooldown, CooldownIndicator } from "./Cooldown"

export class CharacterUi extends Container {
	constructor(characterName: string, abilities: Abilities, ticker: Ticker) {
		super()

		const portrait = new Graphics()
		portrait.beginFill(0x999999)
		portrait.drawCircle(0, 0, 40)
		portrait.endFill()

		const text = new PlainText(characterName)
		text.position.set(50, -25)

		const fireAbility = this.abilityIcon(abilities.fireCooldown, ticker)
		fireAbility.position.set(65, 25)

		const specialAbility = this.abilityIcon(abilities.specialCooldown, ticker)
		specialAbility.position.set(115, 25)

		this.addChild(portrait)
		this.addChild(text)
		this.addChild(fireAbility)
		this.addChild(specialAbility)
	}

	private abilityIcon = (cooldown: Cooldown, ticker: Ticker) => {
		const iconContainer = new Container()

		const cooldownIcon = new Graphics()
		cooldownIcon.beginFill(0x2222ff)
		cooldownIcon.drawCircle(0, 0, 15)
		cooldownIcon.endFill()

		const cooldownIndicator = new CooldownIndicator(cooldown, ticker)

		iconContainer.addChild(cooldownIndicator)
		iconContainer.addChild(cooldownIcon)

		return iconContainer
	}
}