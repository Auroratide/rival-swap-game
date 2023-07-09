import { Container, Graphics, Ticker } from "pixi.js"
import { createDialog } from "./Dialog"
import { DialogPanel } from "./DialogPanel"
import { Positioning } from "../Positioning"
import { Assets } from "../assets"

export class Story extends Container {
	private currentPanelIndex = 0
	private advanceDialog: (() => void) | undefined

	constructor(private ticker: Ticker, private positioning: Positioning, private assets: Assets, private onFinish: () => void) {
		super()

		const background = new Graphics()
		background.beginFill(0xffffff)
		background.drawRect(0, 0, 1, 1)
		background.endFill()
		background.alpha = 0
		positioning.fullScreen(background)

		this.addChild(background)
	}

	start = () => {
		if (!this.hasBeenPlayedBefore()) {
			this.eventMode = 'static'
			this.currentPanelIndex = 0
	
			const dialog = createDialog(this.positioning, this.assets)
			dialog.forEach((panel) => {
				this.addChild(panel)
			})
	
			dialog[0].show(this.ticker)
	
			this.advanceDialog =	this.next(dialog)
			this.on("pointerdown", this.advanceDialog)
			document.addEventListener("keydown", this.advanceDialog)
		} else {
			this.finish()
		}
	}

	finish = () => {
		this.eventMode = 'none'
		this.removeChildren()
		this.off("pointerdown", this.advanceDialog)
		document.removeEventListener("keydown", this.advanceDialog ?? (() => {}))

		this.onFinish()
	}

	private next = (dialog: DialogPanel[]) => () => {
		this.currentPanelIndex += 1

		if (this.currentPanelIndex >= dialog.length) {
			this.finish()
		} else {
			dialog[this.currentPanelIndex - 1].next(dialog[this.currentPanelIndex], this.ticker)
		}
	}

	private hasBeenPlayedBefore = (): boolean => {
		if ('localStorage' in window) {
			const hasBeenPlayed = localStorage.getItem("com.auroratide.rivalrygame::played")
			localStorage.setItem("com.auroratide.rivalrygame::played", "true")
			return hasBeenPlayed === "true"
		} else {
			return false
		}
	}
}
