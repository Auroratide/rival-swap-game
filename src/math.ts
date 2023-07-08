export type Vector2 = {
	x: number
	y: number
}

export const clamp = (min: number, value: number, max: number) =>
	Math.max(min, Math.min(max, value))
