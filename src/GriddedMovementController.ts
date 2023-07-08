import { GridLockedMovement } from "./GridLockedMovement"
import { Vector2, vectorAdd, vectorEquals } from "./math"

export type GriddedMovementKeys = {
	up: string
	right: string
	down: string
	left: string
}

export class GriddedMovementController {
	constructor(private gridLockedMovement: GridLockedMovement, private keys: GriddedMovementKeys, private obstacles: () => GridLockedMovement[]) {
		document.addEventListener("keydown", this.move)
	}

	destroy = () => {
		document.removeEventListener("keydown", this.move)
	}

	private move = (e: KeyboardEvent) => {
		if (e.key === this.keys.right) {
			const target = vectorAdd(this.gridLockedMovement.position, { x: 1, y: 0 })
			if (this.canMoveTo(target)) {
				this.gridLockedMovement.moveBy({ x: 1, y: 0 })
			}
		}
		if (e.key === this.keys.left) {
			const target = vectorAdd(this.gridLockedMovement.position, { x: -1, y: 0 })
			if (this.canMoveTo(target)) {
				this.gridLockedMovement.moveBy({ x: -1, y: 0 })
			}
		}
		if (e.key === this.keys.up) {
			const target = vectorAdd(this.gridLockedMovement.position, { x: 0, y: -1 })
			if (this.canMoveTo(target)) {
				this.gridLockedMovement.moveBy({ x: 0, y: -1 })
			}
		}
		if (e.key === this.keys.down) {
			const target = vectorAdd(this.gridLockedMovement.position, { x: 0, y: 1 })
			if (this.canMoveTo(target)) {
				this.gridLockedMovement.moveBy({ x: 0, y: 1 })
			}
		}
	}

	private canMoveTo = (position: Vector2): boolean => {
		for (const obstacle of this.obstacles()) {
			if (vectorEquals(obstacle.position, position)) {
				return false
			}
		}

		return true
	}
}
