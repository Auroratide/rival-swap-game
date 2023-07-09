import { Assets as PixiAssets, SCALE_MODES, Texture } from "pixi.js"

export const loadAllAssets = async () => {
	const textures = await Promise.all([
		PixiAssets.load("assets/specs-idle.png"),
		PixiAssets.load("assets/shock-orb.png"),
		PixiAssets.load("assets/call-lightning.png"),
		PixiAssets.load("assets/call-lightning-2.png"),
	]) as Texture[]

	textures.forEach((texture) => {
		texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
	})

	const [
		specsIdle,
		shockOrb,
		callLightning,
		callLightningBolt,
	] = textures

	return {
		specs: {
			idle: specsIdle,
		},
		shockOrb: {
			idle: shockOrb,
		},
		callLightning: {
			idle: callLightning,
			bolt: callLightningBolt,
		},
	}
}

export type Assets = Awaited<ReturnType<typeof loadAllAssets>>
