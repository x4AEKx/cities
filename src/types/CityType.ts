export type CityTypeReq = {
	nameRu: string
	nameEn: string
	fontSize: string
	color: string
}

type CityTypeRes = {
	id: number
}

export type CityType = CityTypeRes & CityTypeReq
