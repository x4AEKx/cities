import axios from "axios"

export const instance = axios.create({
	baseURL: "http://localhost:3001/",
})

export const citiesAPI = {
	async getCities(page: number) {
		const { data } = await instance.get(`cities/?_page=${page}&_limit=5`)
		return data
	},

	async getCity(cityId: string) {
		const { data } = await instance.get(`/cities/${cityId}`)
		return data
	},
}
