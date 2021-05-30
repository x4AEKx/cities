import { memo, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { citiesAPI } from "./api/api"

type LocationState = {
	mode: "create" | "update"
}

export const City = memo(function () {
	const location = useLocation<LocationState>()
	const myparam = location.state.mode
	let { cityId } = useParams<{ cityId: string }>()

	useEffect(() => {
		if (cityId) {
			;(async () => {
				const data = await citiesAPI.getCity(cityId)
				console.log(data)
			})()
		}
	}, [cityId])

	return <div>City</div>
})
