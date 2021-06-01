import { useEffect, useState, memo } from "react"
import { useHistory } from "react-router-dom"
import {
	Box,
	Button,
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core"

import { CityType } from "../../types/CityType"
import { citiesAPI } from "../../api/api"

export const Cities = memo(function () {
	const [cities, setCities] = useState<Array<CityType>>([])
	const [page, setPage] = useState<number>(1)
	const [disable, setDisable] = useState<boolean>(false)

	const history = useHistory()

	useEffect(() => {
		;(async () => {
			const data: Array<CityType> = await citiesAPI.getCities(page)
			const nextData: Array<CityType> = await citiesAPI.getCities(page + 1)

			if (data.length < 5 || nextData.length === 0) {
				setDisable(true)
			}

			setCities((c) => [...c, ...data])
		})()
	}, [page])

	const handleClick = () => {
		setPage((page) => page + 1)
	}

	const addCity = () => {
		history.push("/city")
	}

	const updateCity = (cityId: number) => {
		history.push("/city/" + cityId)
	}

	return (
		<div className="Cities">
			<main className="Cities-main">
				{cities.length > 0 && (
					<Container>
						<Box marginTop="1rem" />
						<Button onClick={addCity} className="Button" variant="contained">
							Добавить город
						</Button>
						<Box marginTop="1rem" />
						<TableContainer component={Paper}>
							<Table size="small" aria-label="table">
								<TableHead>
									<TableRow>
										<TableCell>Город</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cities.map((city) => (
										<TableRow key={city.id}>
											<TableCell onClick={() => updateCity(city.id)} component="th" scope="row">
												{city.nameRu}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Box marginTop="1rem" />
						<Button className="Button" disabled={disable} onClick={handleClick} variant="contained">
							Загрузить ещё
						</Button>
						<Box marginTop="1rem" />
					</Container>
				)}
			</main>
		</div>
	)
})
