import { sound } from "@pixi/sound"
import { Assets } from "./assets"

export class SoundManager {
	beam: Sound

	constructor(assets: Assets) {
		this.beam = new Sound("beam", assets.beam.sfx.beam)
	}
}

class Sound {
	key: string

	constructor(key: string, asset: string) {
		this.key = key
		sound.add(key, asset)
	}

	play = () => sound.play(this.key)
}
