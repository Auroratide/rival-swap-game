import { Container, Graphics, Sprite, Ticker } from "pixi.js"
import { Score } from "./Score"
import { Assets } from "./assets"
import { PlayableCharacterAssets } from "./PlayableCharacter"
import { CharacterPortrait } from "./CharacterPortrait"
import { Positioning } from "./Positioning"
import { CONFIG } from "./config"
import { PlainText } from "./PlainText"
import { Tween } from "./story/Tween"

const WIN_QUOTES = {
	tech: {
		normal: "Nothing beats the reliability of science.",
		swapped: "Perhaps magic can teach me something after all.",
	},
	magic: {
		normal: "Magic will beat tech any day!",
		swapped: "Hey, think I can make turrets that shoot fireballs?",
	},
	tie: {
		normal: "Hmm, perhaps magic and tech were meant to work together.",
		swapped: "Y'know, I 'spose magic and tech work better together!",
	},
} as const

export class WinScreen extends Container {
	static Y_RISE = 100

	constructor(private restartGame: () => void, score: Score, positioning: Positioning, ticker: Ticker, assets: Assets, techGuy: PlayableCharacterAssets, magicGirl: PlayableCharacterAssets, isSwapped: () => boolean) {
		super()

		const shade = new Graphics()
		shade.beginFill(0x000000)
		shade.drawRect(-CONFIG.width, -CONFIG.height, 2 * CONFIG.width, 2 * CONFIG.height)
		shade.endFill()
		shade.alpha = 0.667

		const background = new Sprite(assets.stoneTablet.long)
		background.anchor.set(0.5, 0.5)
		background.scale.set(10)
		
		const techPortrait = new CharacterPortrait(40, techGuy, ticker, isSwapped)
		techPortrait.position.set(-250, 60)
		const magicPortrait = new CharacterPortrait(40, magicGirl, ticker, isSwapped)
		magicPortrait.position.set(75, 60)

		const techPoints = new PlainText(score.techGuyPoints.toString(), {
			size: 40,
			align: "left",
			width: 500,
		})
		techPoints.anchor.set(0, 0)
		techPoints.position.set(-175, 38)

		const magicPoints = new PlainText(score.magicGirlPoints.toString(), {
			size: 40,
			align: "left",
			width: 500,
		})
		magicPoints.anchor.set(0, 0)
		magicPoints.position.set(150, 38)

		const winner = score.winner()

		const quote = new PlainText(WIN_QUOTES[winner][isSwapped() ? "swapped" : "normal"], {
			size: 32,
			align: "center",
			width: 500,
		})
		quote.anchor.set(0.5, 0.5)
		quote.position.set(0, -35)
		
		positioning.center(this)
		this.addChild(shade)
		this.addChild(background)
		this.addChild(techPortrait)
		this.addChild(magicPortrait)
		this.addChild(techPoints)
		this.addChild(magicPoints)
		this.addChild(quote)

		if (winner !== "tie") {
			const winnerPortrait = new CharacterPortrait(65, winner === "tech" ? techGuy : magicGirl, ticker, isSwapped)
			winnerPortrait.position.set(0, -150)

			this.addChild(winnerPortrait)
		}

		setTimeout(this.allowRestart, 1000)

		this.y += WinScreen.Y_RISE
		this.alpha = 0

		new Tween(this)
			.property("alpha", 1)
			.property("y", this.y - WinScreen.Y_RISE)
			.time(0.25)
			.start(ticker)
	}

	private allowRestart = () => {
		this.eventMode = "static"
		this.on("pointerdown", this.beginRestart)
		document.addEventListener("keydown", this.beginRestart)
	}

	private beginRestart = () => {
		this.eventMode = "none"
		this.off("pointerdown", this.beginRestart)
		document.removeEventListener("keydown", this.beginRestart)
		this.restartGame()
	}

	destroy = () => {

	}
}
