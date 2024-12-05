import { IDestroyOptions, Sprite, Texture, Ticker } from "pixi.js"
import { CONFIG } from "./config"

export type PlayableCharacterAssets = {
	idle: Texture
	alt: Texture
}

export class PlayableCharacter extends Sprite {
	private sprite: Sprite

	constructor(private assets: PlayableCharacterAssets, private ticker: Ticker, private isSwapped: () => boolean) {
		super()

		this.sprite = new Sprite(assets.idle)
		this.sprite.scale.set(CONFIG.spriteScale)
		this.sprite.anchor.set(0.5)
		this.addChild(this.sprite)

		this.ticker.add(this.tick)
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.ticker.remove(this.tick)
		super.destroy(options)
	}

	private tick = () => {
		if (this.isSwapped()) {
			this.sprite.texture = this.assets.alt
		} else {
			this.sprite.texture = this.assets.idle
		}
	}
}