export class Score {
	techGuyPoints: number = 0
	magicGirlPoints: number = 0

	constructor(private areRolesSwapped: () => boolean) {}

	addTechPoints = (amount: number) => {
		if (this.areRolesSwapped()) {
			this.magicGirlPoints += amount
		} else {
			this.techGuyPoints += amount
		}
	}

	addMagicPoints = (amount: number) => {
		if (this.areRolesSwapped()) {
			this.techGuyPoints += amount
		} else {
			this.magicGirlPoints += amount
		}
	}

	winner = (): "tech" | "magic" | "tie" => {
		if (this.techGuyPoints > this.magicGirlPoints) {
			return "tech"
		} else if (this.magicGirlPoints > this.techGuyPoints) {
			return "magic"
		} else {
			return "tie"
		}
	}
}
