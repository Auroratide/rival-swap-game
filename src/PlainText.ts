import { Text } from "pixi.js"
import { CONFIG } from "./config"

export type PlainTextOptions = {
	size?: number
	align?: "left" | "center" | "right"
	width?: number
	color?: number
}

export class PlainText extends Text {
	constructor(text: string, options: PlainTextOptions = {}) {
		super(text, {
			fontFamily: CONFIG.font,
			fontSize: options.size || 12,
			align: options.align || "left",
			wordWrap: true,
			wordWrapWidth: options.width || 200,
			fill: options.color || 0x000000,
		})
	}
}
