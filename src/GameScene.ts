import { Container } from "pixi.js"
import { Scene } from "./Scene"
import { Field } from "./Field"
import { PlayableCharacter } from "./PlayableCharacter"
import { GridLockedMovement } from "./GridLockedMovement"
import { GriddedMovementController } from "./GriddedMovementController"

export class GameScene extends Container implements Scene {
   static NAME = "game"

	private movementController: GriddedMovementController | undefined

   start = () => {
      const field = new Field({ width: 6, height: 6, unitWidth: 50 })
		const character = new PlayableCharacter()
		const gridLockedCharacter = new GridLockedMovement(field, character)
		this.movementController = new GriddedMovementController(gridLockedCharacter)

      this.addChild(field)
		this.addChild(character)
   }

   stop = () => {
		this.movementController?.destroy()
	}
}
