import { Sprite, Ticker } from "pixi.js"
import { PlainText } from "../PlainText"
import { Tween } from "./Tween"
import { Positioning } from "../Positioning"
import { Assets } from "../assets"
import { CharacterPortrait } from "../CharacterPortrait"

export class DialogPanel extends Sprite {
	static Y_RISE = 100

	constructor(speaker: string, text: string, positioning: Positioning, assets: Assets, portrait?: () => CharacterPortrait) {
		super()

		const background = new Sprite(assets.stoneTablet.long)
		background.anchor.set(0.5, 1)
		background.scale.set(10)
		this.addChild(background)

		if (portrait) {
			const portraitSprite = portrait()
			portraitSprite.position.set(300, -300)
			this.addChild(portraitSprite)
		}

		const speakerSprite = new PlainText(speaker, {
			size: 24,
			align: "left",
		})
		speakerSprite.anchor.set(0, 0)
		speakerSprite.position.set(-380, -250)

		const textSprite = new PlainText(text, {
			size: 30,
			align: "left",
			width: 760,
		})
		textSprite.anchor.set(0, 0)
		textSprite.position.set(-380, -200)

		this.addChild(speakerSprite)
		this.addChild(textSprite)

		this.alpha = 0
		positioning.bottomCenter(this, 10)
		this.y += DialogPanel.Y_RISE
	}

	show = (ticker: Ticker) => {
		new Tween(this)
			.property("alpha", 1)
			.property("y", this.y - DialogPanel.Y_RISE)
			.time(0.25)
			.start(ticker)
	}

	next = (nextPanel: DialogPanel, ticker: Ticker) => {
		new Tween(this)
			.property("alpha", 0)
			.property("y", this.y + DialogPanel.Y_RISE)
			.time(0.25)
			.onFinish(() => nextPanel.show(ticker))
			.start(ticker)
	}
}