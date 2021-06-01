import axios from "axios"

import { CityType, CityTypeReq } from "../types/CityType"

export const instance = axios.create({
	baseURL: "http://localhost:3001/",
})

export const citiesAPI = {
	async getCities(page: number) {
		const { data } = await instance.get(`cities/?_page=${page}&_limit=5`)
		return data as Array<CityType>
	},

	async getCity(cityId: string) {
		const { data } = await instance.get(`cities/${cityId}`)
		return data as CityType
	},

	async updateCity(cityId: string, city: CityTypeReq) {
		await instance.patch(`/cities/${cityId}`, {
			nameRu: city.nameRu,
			nameEn: city.nameEn,
			fontSize: city.fontSize,
			color: city.color,
		})
	},

	async createCity(city: CityTypeReq) {
		await instance.post("/cities", {
			nameRu: city.nameRu,
			nameEn: city.nameEn,
			fontSize: city.fontSize,
			color: city.color,
		})
	},
}
