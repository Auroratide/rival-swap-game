export const CONFIG = {
	width: 1200,
	height: 820,

	monsterHeadHealth: 120,

	lightningDamage: 12,
	turretDamage: 4,

	lightningVelocity: 10,
	turretVelocity: 10,
	callLightningVelocity: 5,

	techGuyName: "Specs",
	magicGirlName: "Rune",
	enemyName: "Immovable Ahbjekt",

	cooldowns: {
		shockOrb: 50,
		callLightning: 200,
		turret: 75,
		wall: 250,
		abilitySwap: 1200,
	},

	font: "Macondo",

	spriteScale: 3.5,

	beam: {
		chargeTime: 2000, // ms
		beamTime: 600, // ms
		minCooldown: 600,
		maxCooldown: 1500,
	},
}
