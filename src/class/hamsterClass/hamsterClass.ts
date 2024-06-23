import { send } from "../sendClass/sendClass"
import { UpgradesForBuy } from "../sendClass/Type/IInfoCard"
import { IHeaders } from "../sendClass/Type/IHeaders"
class HamsterClass {
	async buy(headers: IHeaders) {
		try {
			const data = await send.postInfoCard(headers)
			if (data.isError === true || typeof data.data == 'string') {
				throw new Error('sync')
			}
			const sync = await send.postSync(headers)
			if (sync.isError === true || typeof sync.data == 'string') {
				throw new Error('sync')
			}

			let topSpread = 0

			let topInfo: null | UpgradesForBuy = null

			for (let x of data.data.upgradesForBuy) {
				if (x.isAvailable === false || x.isExpired === true || x.cooldownSeconds) {
					continue
				}
				const spread = x.profitPerHourDelta / x.price
				if (spread > topSpread) {
					topSpread = spread
					topInfo = x
				}
			}
			if (topInfo === null) {
				throw new Error('topInfo')
			}
			if (sync.data.clickerUser.balanceCoins > topInfo.price) {
				await send.postBuy(topInfo.id, headers)
			}
		} catch (e: any) {
			console.log(e.message)
		}
	}
	async tap(headers: IHeaders) {
		try {
			const sync = await send.postSync(headers)
			if (sync.isError === true || typeof sync.data == 'string') {
				throw new Error('sync')
			}
			await send.postTap(sync.data, headers)
			console.log(`Баланс: ${parseInt(String(sync.data.clickerUser.balanceCoins))}. В час рост: ${sync.data.clickerUser.earnPassivePerHour}`)
		} catch (e: any) {
			console.log(e.message)
		}
	}
}

export const hamster = new HamsterClass()