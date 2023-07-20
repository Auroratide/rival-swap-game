import { Sprite, Graphics, Ticker, IDestroyOptions } from "pixi.js"
import { PlayableCharacterAssets } from "./PlayableCharacter"

export class CharacterPortrait extends Sprite {
	private sprite: Sprite

	get flipped() { return this.sprite.scale.x > 0 }
	set flipped(value: boolean) {
		const m = value ? -1 : 1
		this.sprite.scale.x = Math.abs(this.sprite.scale.x) * m
	}

	constructor(size: number, private assets: PlayableCharacterAssets, private ticker: Ticker, private isSwapped: () => boolean) {
		super()

		const graphics = new Graphics()
		graphics.beginFill(0x0f0e17)
		graphics.drawCircle(0, 0, size)
		graphics.endFill()

		const mask = new Graphics()
		mask.beginFill(0xffffff)
		mask.drawCircle(0, 0, size * 0.9)
		mask.endFill()

		this.sprite = new Sprite()	
		this.sprite.scale.set(size / 7)
		this.sprite.anchor.set(0.52, 0.25)
		this.sprite.mask = mask

		this.addChild(graphics)
		this.addChild(mask)
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