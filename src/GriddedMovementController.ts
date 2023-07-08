import { GridLockedMovement } from "./GridLockedMovement"

export type GriddedMovementKeys = {
	up: string
	right: string
	down: string
	left: string
}

export class GriddedMovementController {
	constructor(private gridLockedMovement: GridLockedMovement, private keys: GriddedMovementKeys) {
		document.addEventListener("keydown", this.move)
	}

	destroy = () => {
		document.removeEventListener("keydown", this.move)
	}

	private move = (e: KeyboardEvent) => {
		if (e.key === this.keys.right) {
			this.gridLockedMovement.moveBy({ x: 1, y: 0 })
		}
		if (e.key === this.keys.left) {
			this.gridLockedMovement.moveBy({ x: -1, y: 0 })
		}
		if (e.key === this.keys.up) {
			this.gridLockedMovement.moveBy({ x: 0, y: -1 })
		}
		if (e.key === this.keys.down) {
			this.gridLockedMovement.moveBy({ x: 0, y: 1 })
		}
	}
}
