import { DisplayObject, Graphics, IDestroyOptions, Sprite, Ticker } from "pixi.js"
import { isColliding } from "./isColliding"
import { CONFIG } from "./config"
import { Assets } from "./assets"
import { VerticalIndicator } from "./VerticalIndicator"

export class BigEnemy extends Sprite {
	private heads: (EnemyHead | undefined)[] = []

	constructor(private assets: Assets, private swapProgress: () => number, private ticker: Ticker, private onWin: () => void) {
		super()

		for (let i = 0; i < 5; ++i) {
			const enemyHead = new EnemyHead(this, this.assets, this.swapProgress, this.ticker)
			enemyHead.x = 0
			enemyHead.y = 144 * i - 290
			this.heads.push(enemyHead)
			this.addChild(enemyHead)
		}
	}

	onCollision = <T extends DisplayObject>(withObject: T, fn: (turret: EnemyHead, object: T) => void) => {
		return () => {
			for (const head of this.heads) {
				if (head != null && isColliding(head.collider, withObject)) {
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

		if (this.heads.every((head) => head == null)) {
			this.onWin()
		}
	}

	getAdjacentHeads = (head: EnemyHead): EnemyHead[] => {
		const index = this.heads.indexOf(head)

		if (index !== -1) {
			return [this.heads[index - 1], this.heads[index + 1]].filter((head) => head != null) as EnemyHead[]
		}

		return []
	}
}

export class EnemyHead extends Sprite {
	static MAX_HP = CONFIG.monsterHeadHealth

	collider = new Graphics()
	private hpIndicator = new VerticalIndicator(100)
	private powerSprite = new Sprite()
	hp = EnemyHead.MAX_HP

	constructor(private body: BigEnemy, assets: Assets, private swapProgress: () => number, private ticker: Ticker) {
		super()

		const sprite = new Sprite(assets.monolith.idle)
		const offset = 0.4 * Math.random() - 0.1
		sprite.anchor.set(0.5 + offset, 0.7)
		sprite.scale.set(CONFIG.spriteScale * 1.25)
		this.addChild(sprite)

		this.powerSprite.texture = assets.monolith.power
		this.powerSprite.anchor.set(0.5 + offset, 0.7)
		this.powerSprite.scale.set(CONFIG.spriteScale * 1.25)
		this.powerSprite.alpha = 0
		this.addChild(this.powerSprite)

		this.hpIndicator.x = 80
		this.hpIndicator.y = -50
		this.hpIndicator.draw(1)
		this.addChild(this.hpIndicator)


		this.collider.beginFill(0xffaa00)
		this.collider.drawCircle(0, 0, 50)
		this.collider.endFill()
		this.collider.alpha = 0.001
		this.addChild(this.collider)

		this.ticker.add(this.powerUp)
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

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		this.ticker.remove(this.powerUp)
		super.destroy(options)
	}

	private powerUp = () => {
		this.powerSprite.alpha = Math.max(1 - 2 * this.swapProgress(), 0)
	}
}
