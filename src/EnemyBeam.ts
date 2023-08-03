import { AnimatedSprite, Sprite } from "pixi.js"
import { Assets } from "./assets"
import { CONFIG } from "./config"
import { SoundManager } from "./SoundManager"

export class EnemyBeam extends Sprite {
	private charge: AnimatedSprite
	private shoot: AnimatedSprite | undefined
	private source: AnimatedSprite | undefined
	private beam: AnimatedSprite[] = []

	private chargeTimeout: number | undefined
	private endBeamTimeout: number | undefined

	constructor(private assets: Assets, private sfx: SoundManager) {
		super()

		this.charge = new AnimatedSprite(assets.beam.charge)
		this.charge.scale.set(CONFIG.spriteScale)
		this.charge.animationSpeed = 0.10
		this.charge.play()
		this.addChild(this.charge)

		this.chargeTimeout = window.setTimeout(this.shootBeam, CONFIG.beam.chargeTime)
	}

	destroy = () => {
		super.destroy()
		window.clearTimeout(this.chargeTimeout)
		window.clearTimeout(this.endBeamTimeout)
	}

	private shootBeam = () => {
		this.removeChild(this.charge)
		
		this.shoot = new AnimatedSprite(this.assets.beam.shoot)
		this.shoot.scale.set(CONFIG.spriteScale)
		this.shoot.loop = false
		this.shoot.onComplete = this.startBeam
		this.shoot.play()
		this.shoot.animationSpeed = 0.5

		this.addChild(this.shoot)
	}

	private startBeam = () => {
		const horizontalOffset = 95

		const animationSpeed = 0.2

		this.source = new AnimatedSprite(this.assets.beam.source)
		this.source.animationSpeed = animationSpeed
		this.source.scale.set(CONFIG.spriteScale)
		this.source.play()

		for (let i = 0; i < 15; i++) {
			const beam = new AnimatedSprite(this.assets.beam.segment)
			beam.scale.set(CONFIG.spriteScale)
			beam.play()
			beam.animationSpeed = animationSpeed
			this.beam.push(beam)
			this.addChild(beam)
			beam.x -= beam.width * i + horizontalOffset
		}

		this.addChild(this.source)
		if (this.shoot) {
			this.removeChild(this.shoot)
		}

		window.setTimeout(this.endBeam, CONFIG.beam.beamTime)
		this.sfx.beam.play()
	}

	private endBeam = () => {
		if (this.source) {
			this.removeChild(this.source)
		}
		this.beam.forEach((beam) => this.removeChild(beam))
		this.beam = []

		window.setTimeout(this.destroy)
	}
}
