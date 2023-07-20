import { Container, DisplayObject, Renderer } from "pixi.js"

export class Positioning {
	constructor(private renderer: Renderer) {}

	fullScreen = (obj: Container) => {
		obj.position.set(0, 0)
		obj.width = this.renderer.width
		obj.height = this.renderer.height
	}

	center = (obj: DisplayObject) => {
		obj.position.set(this.renderer.width / 2, this.renderer.height / 2)
	}

	bottomCenter = (obj: DisplayObject, padding = 0) => {
		obj.position.set(this.renderer.width / 2, this.renderer.height - padding)
	}
}
