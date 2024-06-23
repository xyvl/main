import { data } from "./class/dataClass/dataClass"
import { hamster } from "./class/hamsterClass/hamsterClass"

setInterval(async () => {
	try {
		for (let i = 0; i < data.JWT.length; i++) {

			if (data.actions.isBuy) {
				hamster.buy({
					...data.account,
					'Authorization': data.JWT[i]
				})
			}

		}
	} catch (e: any) {

	}
}, 5000)
setInterval(() => {
	try {
		for (let i = 0; i < data.JWT.length; i++) {
			if (data.actions.isTap) {
				hamster.tap({
					...data.account,
					'Authorization': data.JWT[i]
				})
			}
		}
	} catch (e) {
		
	}
}, 180_000)
