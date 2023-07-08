import { Graphics, Sprite } from "pixi.js"

export class BigEnemy extends Sprite {
	private graphics = new Graphics()

	constructor() {
		super()

		this.draw()
		this.addChild(this.graphics)

		for (let i = 0; i < 5; ++i) {
			const enemyHead = new EnemyHead()
			enemyHead.x = 0
			enemyHead.y = 144 * i - 290
			this.addChild(enemyHead)
		}
	}

	private draw = () => {
		this.graphics.beginFill(0xaa8800)
		this.graphics.drawRect(-100, -360, 200, 720)
		this.graphics.endFill()
	}
}

export class EnemyHead extends Sprite {
	private graphics = new Graphics()

	constructor() {
		super()

		this.draw()
		this.addChild(this.graphics)
	}

	private draw = () => {
		this.graphics.beginFill(0xffaa00)
		this.graphics.drawCircle(0, 0, 50)
		this.graphics.endFill()
	}
}
