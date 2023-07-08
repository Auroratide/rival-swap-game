import { Abilities } from "./Abilities"

export type AbilityKeys = {
	fire: string
	special: string
}

export class AbilityController {
	constructor(private abilities: Abilities, private keys: AbilityKeys) {
		document.addEventListener("keydown", this.fire)
		document.addEventListener("keydown", this.special)
	}

	destroy = () => {
		document.removeEventListener("keydown", this.fire)
		document.removeEventListener("keydown", this.special)
	}

	private fire = (e: KeyboardEvent) => {
		if (e.key === this.keys.fire) {
			this.abilities.fire()
		}
	}

	private special = (e: KeyboardEvent) => {
		if (e.key === this.keys.special) {
			this.abilities.special()
		}
	}
}
