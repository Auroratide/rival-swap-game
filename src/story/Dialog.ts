import { CharacterPortrait } from "../CharacterPortrait"
import { Positioning } from "../Positioning"
import { Assets } from "../assets"
import { CONFIG } from "../config"
import { DialogPanel } from "./DialogPanel"

export const createDialog = (positioning: Positioning, assets: Assets, portraits: {
	tech: () => CharacterPortrait,
	magic: () => CharacterPortrait,
}): DialogPanel[] => {
	return [
		new DialogPanel(CONFIG.techGuyName, `There it is, the legendary ${CONFIG.enemyName}.`, positioning, assets, portraits.tech),
		new DialogPanel(CONFIG.techGuyName, "Not gonna lie, it looks far weaker than I expected.", positioning, assets, portraits.tech),
		new DialogPanel(CONFIG.magicGirlName, "That thing stands no chance against my fire magic! We won't even have to try.", positioning, assets, portraits.magic),
		new DialogPanel(CONFIG.magicGirlName, "Hey, hey, we might as well make this a game right? Bet I can defeat more heads than you!", positioning, assets, portraits.magic),
		new DialogPanel(CONFIG.techGuyName, "Oh please. Modern technology is far superior to your primal magic.", positioning, assets, portraits.tech),
		new DialogPanel(CONFIG.magicGirlName, "Ok you know what? I'm NOT gonna use fire magic after all. I'm gonna use lightning just to teach you and your machines a lesson. That monster's mine!", positioning, assets, portraits.magic),
		new DialogPanel(CONFIG.techGuyName, "Of course you would. Well no matter. If you are too busy wasting time destroying my turrets, all the monster loot will go to me!", positioning, assets, portraits.tech),
		new DialogPanel("", "Get more killing blows on the heads than your rival!", positioning, assets),
	]
}

export const createMidwayDialog = (positioning: Positioning, assets: Assets, portraits: {
	tech: () => CharacterPortrait,
	magic: () => CharacterPortrait,
}): DialogPanel[] => {
	return [
		new DialogPanel(CONFIG.magicGirlName, "Wha-- what happened?!", positioning, assets, portraits.magic),
		new DialogPanel(CONFIG.techGuyName, "I... suddenly know how to use magic now.", positioning, assets, portraits.tech),
		new DialogPanel(CONFIG.techGuyName, "Disgusting.", positioning, assets, portraits.tech),
		new DialogPanel(CONFIG.magicGirlName, "And I can do science stuff. How cool!", positioning, assets, portraits.magic),
		new DialogPanel(CONFIG.magicGirlName, "That means all these turrets are mine now. Go my machines! Rack up my points!", positioning, assets, portraits.magic),
		new DialogPanel(CONFIG.techGuyName, "You can't just--! Very well, have a taste of your own magic!", positioning, assets, portraits.tech),
	]
}