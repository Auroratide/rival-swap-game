import { Container, Ticker } from "pixi.js"
import { Scene } from "./Scene"
import { Field } from "./Field"
import { PlayableCharacter } from "./PlayableCharacter"
import { GridLockedMovement } from "./GridLockedMovement"
import { GriddedMovementController } from "./GriddedMovementController"
import { AbilityController } from "./AbilityController"

export class GameScene extends Container implements Scene {
   static NAME = "game"

	private movementController: GriddedMovementController | undefined
	private abilityController: AbilityController | undefined

	constructor(private ticker: Ticker) {
		super()
	}

   start = () => {
      const field = new Field({ width: 6, height: 6, unitWidth: 100 })
		const character = new PlayableCharacter()
		const gridLockedCharacter = new GridLockedMovement(field, character)
		this.movementController = new GriddedMovementController(gridLockedCharacter)
		this.abilityController = new AbilityController(character, this.ticker, this)

      this.addChild(field)
		this.addChild(character)
   }

   stop = () => {
		this.movementController?.destroy()
		this.abilityController?.destroy()
	}
}
