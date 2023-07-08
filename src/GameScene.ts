import { Container, Ticker } from "pixi.js"
import { Scene } from "./Scene"
import { Field } from "./Field"
import { PlayableCharacter } from "./PlayableCharacter"
import { GridLockedMovement } from "./GridLockedMovement"
import { GriddedMovementController } from "./GriddedMovementController"
import { AbilityController } from "./AbilityController"
import { MAGIC_GIRL_KEYS, TECH_GUY_KEYS } from "./PlayerControls"
import { MagicAbilities, TechAbilities } from "./Abilities"
import { TurretGroup } from "./Turret"
import { BigEnemy } from "./BigEnemy"
import { CharacterUi } from "./CharacterUi"

export class GameScene extends Container implements Scene {
   static NAME = "game"

	private movementControllers: GriddedMovementController[] = []
	private abilityControllers: AbilityController[] = []

	constructor(private ticker: Ticker) {
		super()
	}

   start = () => {
      const field = new Field({ width: 5, height: 5, unitWidth: 144 })
		field.position.set(0, 100)

		const techGuy = new PlayableCharacter()
		const gridLockedTech = new GridLockedMovement(field, techGuy)
		const turretGroup = new TurretGroup(this.ticker)
		const tech = new TechAbilities(gridLockedTech, field, this, turretGroup, this.ticker)
		this.movementControllers.push(new GriddedMovementController(gridLockedTech, TECH_GUY_KEYS))
		this.abilityControllers.push(new AbilityController(tech, TECH_GUY_KEYS))

		const magicGirl = new PlayableCharacter()
		const magic = new MagicAbilities(magicGirl, this.ticker, this, turretGroup)
		const gridLockedMagic = new GridLockedMovement(field, magicGirl)
		this.movementControllers.push(new GriddedMovementController(gridLockedMagic, MAGIC_GIRL_KEYS))
		this.abilityControllers.push(new AbilityController(magic, MAGIC_GIRL_KEYS))

		const bigEnemy = new BigEnemy()
		bigEnemy.position.set(1100, 460)

		const ui = new Container()
		const techUi = new CharacterUi("Tech guy", tech, this.ticker)
		techUi.position.set(50, 50)

		const magicUi = new CharacterUi("Magic girl", magic, this.ticker)
		magicUi.position.set(325, 50)

		ui.addChild(techUi)
		ui.addChild(magicUi)

      this.addChild(field)
		this.addChild(magicGirl)
		this.addChild(techGuy)
		this.addChild(bigEnemy)

		this.addChild(ui)
   }

   stop = () => {
		this.movementControllers.forEach(controller => controller.destroy())
		this.abilityControllers.forEach(controller => controller.destroy())

		this.movementControllers = []
		this.abilityControllers = []
	}
}
