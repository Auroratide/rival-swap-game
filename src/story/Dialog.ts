import { Positioning } from "../Positioning"
import { DialogPanel } from "./DialogPanel"

export const createDialog = (positioning: Positioning): DialogPanel[] => {
	return [
		new DialogPanel("Tech Guy", "There it is, the legendary _______.", positioning),
		new DialogPanel("Tech Guy", "Not gonna lie, it looks far weaker than I expected.", positioning),
		new DialogPanel("Magic Girl", "That thing stands no chance against my fire magic! We won't even have to try.", positioning),
		new DialogPanel("Magic Girl", "Hey, hey, we might as well make this a game right? Bet I can defeat more heads than you!", positioning),
		new DialogPanel("Tech Guy", "Oh please. Modern technology is far superior to your primal magic.", positioning),
		new DialogPanel("Magic Girl", "Ok you know what? I'm NOT gonna use fire magic after all. I'm gonna use lightning just to teach you and your machines a lesson. That monster's mine!", positioning),
		new DialogPanel("Tech Guy", "Of course you would. Well no matter. If you are too busy wasting time destroying my turrets, all the monster loot will go to me!", positioning),
		new DialogPanel("", "Get more killing blows on the heads than your rival!", positioning),
	]
}