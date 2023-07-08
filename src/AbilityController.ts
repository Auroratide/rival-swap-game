import { Container, DisplayObject, Ticker } from "pixi.js"
import { ShockOrb } from "./ShockOrb"

export class AbilityController {
	constructor(private user: DisplayObject, private ticker: Ticker, private stage: Container) {
		document.addEventListener("keydown", this.fire)
	}

	destroy = () => {
		document.removeEventListener("keydown", this.fire)
	}

	private fire = (e: KeyboardEvent) => {
		if (e.key === " ") {
			const orb = new ShockOrb(this.ticker)
			orb.position.x = this.user.position.x
			orb.position.y = this.user.position.y

			this.stage.addChild(orb)
		}
	}
}
