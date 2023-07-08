export type Vector2 = {
	x: number
	y: number
}

export const clamp = (min: number, value: number, max: number) =>
	Math.max(min, Math.min(max, value))

export const vectorAdd = (a: Vector2, b: Vector2): Vector2 => ({
	x: a.x + b.x,
	y: a.y + b.y
})

export const vectorEquals = (a: Vector2, b: Vector2) =>
	a.x === b.x && a.y === b.y
