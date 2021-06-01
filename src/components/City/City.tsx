import { Card, CardHeader, CardContent, Container, Box, Button } from "@material-ui/core"
import { FormEvent, memo, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { SelectFontSize } from "./SelectFontSize/SelectFontSize"
import { ColorPicker } from "./ColorPicker/ColorPicker"
import { CityTypeReq } from "../../types/CityType"
import { citiesAPI } from "../../api/api"
import { CityName } from "./CityName/CityName"

export const City = memo(function () {
	let { cityId } = useParams<{ cityId: string }>()

	const [nameRu, setNameRu] = useState<string>("")
	const [nameEn, setNameEn] = useState<string>("")
	const [fontSize, setFontSize] = useState<string>("")
	const [colorPick, setColorPick] = useState<string>("")

	useEffect(() => {
		if (cityId) {
			;(async () => {
				const data = await citiesAPI.getCity(cityId)
				setNameRu(data.nameRu)
				setNameEn(data.nameEn)
				setFontSize(data.fontSize)
				setColorPick(data.color)
			})()
		}
	}, [cityId])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (cityId) {
			;(async () => {
				const city: CityTypeReq = {
					nameRu,
					nameEn,
					fontSize,
					color: colorPick,
				}
				await citiesAPI.updateCity(cityId, city)
			})()
		} else {
			;(async () => {
				const city: CityTypeReq = {
					nameRu,
					nameEn,
					fontSize,
					color: colorPick,
				}
				await citiesAPI.createCity(city)
			})()
		}
	}

	return (
		<div>
			<main className="Cities-main">
				<Container>
					<Card>
						<CardHeader title={cityId ? "Редактировать город" : "Создать город"} />
						<hr />
						<CardContent>
							<form onSubmit={(e) => handleSubmit(e)}>
								<div className="d-f">
									<CityName value={nameRu} setName={(e) => setNameRu(e)} label="Город (RU)" />
									<CityName value={nameEn} setName={(e) => setNameEn(e)} label="Город (ENG)" />
								</div>
								<Box marginTop="1rem" />
								<div className="d-f">
									<SelectFontSize fontSize={fontSize} setFontSize={(e) => setFontSize(e)} />
									<ColorPicker colorPick={colorPick} setColorPick={setColorPick} />
								</div>

								<Box marginTop="4rem" />
								<Button
									type="submit"
									className="Button"
									variant="contained"
									disabled={!nameRu || !nameEn || !colorPick || !fontSize}
								>
									{cityId ? "Изменить" : "Создать"}
								</Button>
								<Box marginTop="1rem" />
							</form>
						</CardContent>
					</Card>
				</Container>
			</main>
		</div>
	)
})
