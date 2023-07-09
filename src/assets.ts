import { Assets as PixiAssets, SCALE_MODES, Texture } from "pixi.js"

export const loadAllAssets = async () => {
	const specsIdle = await PixiAssets.load("assets/specs-idle.png") as Texture
	specsIdle.baseTexture.scaleMode = SCALE_MODES.NEAREST

	return {
		specs: {
			idle: specsIdle,
		}
	}
}

export type Assets = Awaited<ReturnType<typeof loadAllAssets>>
