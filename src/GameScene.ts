import { Container, Renderer, Ticker } from "pixi.js"
import { Scene } from "./Scene"
import { Field } from "./Field"
import { PlayableCharacter } from "./PlayableCharacter"
import { GridLockedMovement } from "./GridLockedMovement"
import { GriddedMovementController } from "./GriddedMovementController"
import { MAGIC_GIRL_KEYS, TECH_GUY_KEYS } from "./PlayerControls"
import { MagicAbilities, TechAbilities } from "./Abilities"
import { TurretGroup } from "./Turret"
import { BigEnemy } from "./BigEnemy"
import { CharacterUi } from "./CharacterUi"
import { AbilitySwap } from "./AbilitySwap"
import { Story } from "./story/Story"
import { Positioning } from "./Positioning"
import { CONFIG } from "./config"
import { Score } from "./Score"
import { EnemyUi } from "./EnemyUi"

export class GameScene extends Container implements Scene {
   static NAME = "game"

	private movementControllers: GriddedMovementController[] = []
	private abilitySwap: AbilitySwap | undefined

	constructor(private ticker: Ticker, private renderer: Renderer) {
		super()
	}

   start = () => {
		const positioning = new Positioning(this.renderer)
		const story = new Story(this.ticker, positioning, this.beginGame)

		this.addChild(story)

		story.start()
   }

	private beginGame = () => {
		const field = new Field({ width: 5, height: 5, unitWidth: 144 })
		field.position.set(0, 100)

		const score = new Score(() => this.abilitySwap?.areSwapped() ?? false)

		const bigEnemy = new BigEnemy()
		bigEnemy.position.set(1100, 460)

		const turretGroup = new TurretGroup(this.ticker, bigEnemy, score)

		const techGuy = new PlayableCharacter()
		const gridLockedTech = new GridLockedMovement(field, techGuy)
		const techForTechGuy = new TechAbilities(gridLockedTech, field, this, turretGroup, this.ticker)
		const magicForTechGuy = new MagicAbilities(techGuy, this.ticker, this, turretGroup, bigEnemy, score)
		
		const magicGirl = new PlayableCharacter()
		const magicForMagicGirl = new MagicAbilities(magicGirl, this.ticker, this, turretGroup, bigEnemy, score)
		const gridLockedMagic = new GridLockedMovement(field, magicGirl)
		const techForMagicGirl = new TechAbilities(gridLockedMagic, field, this, turretGroup, this.ticker)
		gridLockedMagic.moveTo({ x: 0, y: 4 })
		
		this.movementControllers.push(new GriddedMovementController(gridLockedTech, TECH_GUY_KEYS, turretGroup.obstacles))
		this.movementControllers.push(new GriddedMovementController(gridLockedMagic, MAGIC_GIRL_KEYS, turretGroup.obstacles))

		this.abilitySwap = new AbilitySwap(
			[techForTechGuy, magicForTechGuy],
			[magicForMagicGirl, techForMagicGirl],
			this.ticker
		)

		this.abilitySwap?.start()

		const ui = new Container()
		const techUi = new CharacterUi(CONFIG.techGuyName, [techForTechGuy, magicForTechGuy], this.ticker, () => score.techGuyPoints)
		techUi.position.set(50, 50)

		const magicUi = new CharacterUi(CONFIG.magicGirlName, [magicForMagicGirl, techForMagicGirl], this.ticker, () => score.magicGirlPoints)
		magicUi.position.set(325, 50)

		const enemyUi = new EnemyUi(CONFIG.enemyName, this.abilitySwap!.cooldown, this.ticker)
		enemyUi.position.set(925, 50)

		ui.addChild(techUi)
		ui.addChild(magicUi)
		ui.addChild(enemyUi)

      this.addChild(field)
		this.addChild(magicGirl)
		this.addChild(techGuy)
		this.addChild(bigEnemy)

		this.addChild(ui)
	}

   stop = () => {
		this.movementControllers.forEach(controller => controller.destroy())
		this.abilitySwap?.destroy()

		this.movementControllers = []
	}
}
