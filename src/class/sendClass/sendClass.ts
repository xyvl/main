import axios, { AxiosResponse } from "axios"
import { ISync } from "./Type/ISync"
import { IInfoCard } from "./Type/IInfoCard"
import { DataClass } from "../dataClass/dataClass"
import { IHeaders } from "./Type/IHeaders"

class SendClass extends DataClass {
	async postSync(headers: IHeaders): Promise<{ data: ISync | string, isError: boolean }> {
		let result: { data: ISync | string, isError: boolean } = {
			data: '',
			isError: true
		}

		await axios.post(
			'https://api.hamsterkombat.io/clicker/sync',
			{},
			{
				headers: {
					Authorization: headers.Authorization,
					"Content-Type": headers["Content-Type"],
					"User-Agent": headers["User-Agent"]
				}
			}
		)
			.then((data: AxiosResponse<ISync>) => {
				result.data = data.data
				result.isError = false
				return data
			})
			.catch(() => {
				result.isError = true
			})
		return result
	}
	async postTap(sync: ISync, headers: IHeaders): Promise<boolean> {
		let isError = true
		const data = {
			count: sync.clickerUser.availableTaps,
			availableTaps: 2000,
			timestamp: new Date().getTime()
		}
		await axios.post('https://api.hamsterkombat.io/clicker/tap', data, {
			headers: {
				Authorization: headers.Authorization,
				"Content-Type": headers["Content-Type"],
				"User-Agent": headers["User-Agent"]
			}
		})
			.then((data) => {
				isError = false
				return data
			})
			.catch(() => {
				isError = true
			})
		return isError
	}
	async postInfoCard(headers: IHeaders) {
		let result: { data: IInfoCard | string, isError: boolean } = {
			data: '',
			isError: true
		}
		await axios.post('https://api.hamsterkombat.io/clicker/upgrades-for-buy', {}, {
			headers: {
				Authorization: headers.Authorization,
				"Content-Type": headers["Content-Type"],
				"User-Agent": headers["User-Agent"]
			}
		})
			.then((data: AxiosResponse<IInfoCard>) => {
				result.data = data.data
				result.isError = false
				return data
			})
			.catch(() => {
				result.isError = true
			})
		return result
	}
	async postBuy(id: string, headers: IHeaders) {
		let isError = true
		await axios.post('https://api.hamsterkombat.io/clicker/buy-upgrade',
			{
				upgradeId: id,
				timestamp: 0
			}
			, {
				headers: {
					Authorization: headers.Authorization,
					"Content-Type": headers["Content-Type"],
					"User-Agent": headers["User-Agent"]
				}
			})
			.then((data: AxiosResponse<IInfoCard>) => {
				isError = false
				return data
			})
			.catch(() => {
				isError = true
			})
		return isError
	}
}

export const send = new SendClass()