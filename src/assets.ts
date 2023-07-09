import { Assets as PixiAssets, SCALE_MODES, Texture } from "pixi.js"

export const loadAllAssets = async () => {
	const textures = await Promise.all([
		PixiAssets.load("assets/specs-idle.png"),
		PixiAssets.load("assets/specs-mage.png"),
		PixiAssets.load("assets/rune-idle.png"),
		PixiAssets.load("assets/rune-tech.png"),
		PixiAssets.load("assets/shock-orb.png"),
		PixiAssets.load("assets/call-lightning.png"),
		PixiAssets.load("assets/call-lightning-2.png"),
		PixiAssets.load("assets/turret-idle.png"),
		PixiAssets.load("assets/arrow.png"),
		PixiAssets.load("assets/stone-tablet.png"),
	]) as Texture[]

	textures.forEach((texture) => {
		texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
	})

	const [
		specsIdle,
		specsMage,
		runeIdle,
		runeTech,
		shockOrb,
		callLightning,
		callLightningBolt,
		turretIdle,
		arrow,
		stoneTablet,
	] = textures

	return {
		specs: {
			idle: specsIdle,
			alt: specsMage,
		},
		rune: {
			idle: runeIdle,
			alt: runeTech,
		},
		shockOrb: {
			idle: shockOrb,
		},
		callLightning: {
			idle: callLightning,
			bolt: callLightningBolt,
		},
		turret: {
			idle: turretIdle,
			arrow: arrow,
		},
		stoneTablet: {
			long: stoneTablet,
		},
	}
}

export type Assets = Awaited<ReturnType<typeof loadAllAssets>>
