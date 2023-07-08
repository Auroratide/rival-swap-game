import { Graphics, Sprite, Ticker } from "pixi.js"
import { PlainText } from "../PlainText"
import { Tween } from "./Tween"
import { Positioning } from "../Positioning"

export class DialogPanel extends Sprite {
	static Y_RISE = 100
	private graphics = new Graphics()

	constructor(speaker: string, text: string, positioning: Positioning) {
		super()

		this.draw()
		this.addChild(this.graphics)

		const speakerSprite = new PlainText(speaker, {
			size: 24,
			align: "left",
		})
		speakerSprite.anchor.set(0, 0)
		speakerSprite.position.set(-380, -190)

		const textSprite = new PlainText(text, {
			size: 30,
			align: "left",
			width: 760,
		})
		textSprite.anchor.set(0, 0)
		textSprite.position.set(-380, -150)

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

	private draw = () => {
		this.graphics.beginFill(0x999999)
		this.graphics.drawRect(-400, -200, 800, 200)
		this.graphics.endFill()
	}
}