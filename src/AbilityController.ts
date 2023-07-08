import { Abilities } from "./Abilities"

export type AbilityKeys = {
	fire: string
}

export class AbilityController {
	constructor(private abilities: Abilities, private keys: AbilityKeys) {
		document.addEventListener("keydown", this.fire)
	}

	destroy = () => {
		document.removeEventListener("keydown", this.fire)
	}

	private fire = (e: KeyboardEvent) => {
		if (e.key === this.keys.fire) {
			this.abilities.fire()
		}
	}
}
