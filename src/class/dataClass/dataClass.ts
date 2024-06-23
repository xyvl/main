import { IAccount } from "./Type/IAccount"

export class DataClass {
	account: IAccount = {
		'Content-Type': 'application/json',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
	}
	JWT: string[] = ['Bearer 1719050710924BDBrCaJHR3pAo4FGINEi9iyFFZzLxL8sDCMCpoVM0BOYhebod1FMzPCHbtfc5IXY780379324',
		'Bearer 1719080612596xuPGucclXVYGfYde9wqTFUmKz7XluzXqD2KLVEPxCLyIbVYmJ5TAIR8gdDIsJrc4795341291'
	]
	actions = {
		isTap: true,
		isBuy: true
	}
}
export const data = new DataClass()