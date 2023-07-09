import { Graphics, IDestroyOptions, Sprite, Texture, Ticker } from "pixi.js"

export type PlayableCharacterAssets = {
	idle: Texture
}

export class PlayableCharacter extends Sprite {
	private graphics = new Graphics()
	private sprite: Sprite | undefined

	constructor(private color: number, assets?: PlayableCharacterAssets, private ticker?: Ticker) {
		super()

		if (assets != null) {
			this.sprite = new Sprite(assets.idle)
			this.sprite.scale.set(3.5)
			this.sprite.anchor.set(0.5)
			this.addChild(this.sprite)
			this.ticker?.add(this.idleAnimation)
		} else {
			this.draw()
			this.addChild(this.graphics)
		}
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.ticker?.remove(this.idleAnimation)
		super.destroy(options)
	}

	private draw = () => {
		this.graphics.beginFill(this.color)
		this.graphics.drawCircle(0, 0, 20)
		this.graphics.endFill()
	}

	private idleAnimation = () => {
		
	}
}