import { GridLockedMovement } from "./GridLockedMovement"

export class GriddedMovementController {
	constructor(private gridLockedMovement: GridLockedMovement) {
		document.addEventListener("keydown", this.move)
	}

	destroy = () => {
		document.removeEventListener("keydown", this.move)
	}

	private move = (e: KeyboardEvent) => {
		if (e.key === "ArrowRight") {
			this.gridLockedMovement.moveBy({ x: 1, y: 0 })
		}
		if (e.key === "ArrowLeft") {
			this.gridLockedMovement.moveBy({ x: -1, y: 0 })
		}
		if (e.key === "ArrowUp") {
			this.gridLockedMovement.moveBy({ x: 0, y: -1 })
		}
		if (e.key === "ArrowDown") {
			this.gridLockedMovement.moveBy({ x: 0, y: 1 })
		}
	}
}
