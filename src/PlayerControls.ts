import { AbilityKeys } from "./AbilityController"
import { GriddedMovementKeys } from "./GriddedMovementController"

type PlayerControls = AbilityKeys & GriddedMovementKeys

export const TECH_GUY_KEYS: PlayerControls = {
	fire: "q",
	special: "e",
	up: "w",
	right: "d",
	down: "s",
	left: "a",
} as const

export const MAGIC_GIRL_KEYS: PlayerControls = {
	fire: " ",
	special: "Shift",
	up: "ArrowUp",
	right: "ArrowRight",
	down: "ArrowDown",
	left: "ArrowLeft",
} as const
