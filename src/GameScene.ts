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

export class GameScene extends Container implements Scene {
   static NAME = "game"

	private movementControllers: GriddedMovementController[] = []
	private abilityControllers: AbilityController[] = []

	constructor(private ticker: Ticker) {
		super()
	}

   start = () => {
      const field = new Field({ width: 6, height: 6, unitWidth: 135 })

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

      this.addChild(field)
		this.addChild(magicGirl)
		this.addChild(techGuy)
   }

   stop = () => {
		this.movementControllers.forEach(controller => controller.destroy())
		this.abilityControllers.forEach(controller => controller.destroy())

		this.movementControllers = []
		this.abilityControllers = []
	}
}
