import { DisplayObject, Graphics, Sprite } from "pixi.js"
import { isColliding } from "./isColliding"
import { CircularIndicator } from "./CircularIndicator"

export class BigEnemy extends Sprite {
	private graphics = new Graphics()
	private heads: EnemyHead[] = []

	constructor() {
		super()

		this.draw()
		this.addChild(this.graphics)

		for (let i = 0; i < 5; ++i) {
			const enemyHead = new EnemyHead(this)
			enemyHead.x = 0
			enemyHead.y = 144 * i - 290
			this.heads.push(enemyHead)
			this.addChild(enemyHead)
		}
	}

	onCollision = <T extends DisplayObject>(withObject: T, fn: (turret: EnemyHead, object: T) => void) => {
		return () => {
			for (const head of this.heads) {
				if (isColliding(head, withObject)) {
					fn(head, withObject)
					break
				}
			}
		}
	}

	killHead = (head: EnemyHead) => {
		this.heads = this.heads.filter((h) => h !== head)
		this.removeChild(head)
		head.destroy()
	}

	private draw = () => {
		this.graphics.beginFill(0xaa8800)
		this.graphics.drawRect(-100, -360, 200, 720)
		this.graphics.endFill()
	}
}

export class EnemyHead extends Sprite {
	static MAX_HP = 120

	private graphics = new Graphics()
	private hpIndicator = new CircularIndicator(57.5)
	hp = EnemyHead.MAX_HP

	constructor(private body: BigEnemy) {
		super()

		this.draw()
		this.hpIndicator.draw(1)
		this.addChild(this.hpIndicator)
		this.addChild(this.graphics)
	}

	damage = (amount: number) => {
		this.hp -= amount
		this.hpIndicator.draw(this.hp / EnemyHead.MAX_HP)

		if (this.hp <= 0) {
			this.body.killHead(this)
		}
	}

	private draw = () => {
		this.graphics.beginFill(0xffaa00)
		this.graphics.drawCircle(0, 0, 50)
		this.graphics.endFill()
	}
}
