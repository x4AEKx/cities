import { useEffect, useState, memo } from "react"
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

import { citiesAPI } from "./api/api"
import "./Cities.css"

type CityType = {
	id: number
	nameRu: string
	nameEn: string
	fontSize: string
	color: string
}

export const Cities = memo(function () {
	const [cities, setCities] = useState<Array<CityType>>([])
	const [page, setPage] = useState<number>(1)
	const [disable, setDisable] = useState<boolean>(false)

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

	return (
		<div className="Cities">
			<header className="Cities-header">
				{cities.length > 0 && (
					<Container>
						<Box marginTop="1rem" />
						<Button className="Button" variant="contained">
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
											<TableCell component="th" scope="row">
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
			</header>
		</div>
	)
})
