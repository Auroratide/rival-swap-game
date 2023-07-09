import { Sprite, Texture } from "pixi.js"

export type PlayableCharacterAssets = {
	idle: Texture
	alt: Texture
}

export class PlayableCharacter extends Sprite {
	private sprite: Sprite | undefined

	constructor(assets: PlayableCharacterAssets) {
		super()

		this.sprite = new Sprite(assets.idle)
		this.sprite.scale.set(3.5)
		this.sprite.anchor.set(0.5)
		this.addChild(this.sprite)
	}
}