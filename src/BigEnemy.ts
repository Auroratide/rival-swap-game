import { DisplayObject, Graphics, Sprite } from "pixi.js"
import { isColliding } from "./isColliding"
import { CircularIndicator } from "./CircularIndicator"
import { CONFIG } from "./config"

export class BigEnemy extends Sprite {
	private graphics = new Graphics()
	private heads: (EnemyHead | undefined)[] = []

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
				if (head != null && isColliding(head, withObject)) {
					fn(head, withObject)
					break
				}
			}
		}
	}

	killHead = (head: EnemyHead) => {
		const index = this.heads.indexOf(head)

		if (index !== -1) {
			this.heads[index] = undefined
		}

		this.removeChild(head)
		head.destroy()
	}

	getAdjacentHeads = (head: EnemyHead): EnemyHead[] => {
		const index = this.heads.indexOf(head)

		if (index !== -1) {
			return [this.heads[index - 1], this.heads[index + 1]].filter((head) => head != null) as EnemyHead[]
		}

		return []
	}

	private draw = () => {
		this.graphics.beginFill(0xaa8800)
		this.graphics.drawRect(-100, -360, 200, 720)
		this.graphics.endFill()
	}
}

export class EnemyHead extends Sprite {
	static MAX_HP = CONFIG.monsterHeadHealth

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

	// returns score for damage
	damage = (amount: number): number => {
		this.hp -= amount
		this.hpIndicator.draw(this.hp / EnemyHead.MAX_HP)

		if (this.hp <= 0) {
			this.body.killHead(this)
		}

		return amount + (this.hp <= 0 ? 50 : 0)
	}

	private draw = () => {
		this.graphics.beginFill(0xffaa00)
		this.graphics.drawCircle(0, 0, 50)
		this.graphics.endFill()
	}
}
