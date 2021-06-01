import { ChangeEvent, memo, useEffect, useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { TextField } from "@material-ui/core"

type CityNameType = {
	value?: string
	label?: string
	setName?: (e: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	})
)

export const CityName = memo(function ({ value, label, setName }: CityNameType) {
	const classes = useStyles()

	const [inputValue, setInputValue] = useState("")

	useEffect(() => {
		if (value) {
			setInputValue(value)
		}
	}, [value])

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setInputValue(e.currentTarget.value)
		setName && setName(e.currentTarget.value)
	}

	return (
		<TextField
			className={classes.formControl}
			fullWidth
			error={!inputValue}
			onChange={handleChange}
			required
			id="outlined-required"
			label={label}
			value={inputValue && inputValue}
			variant="outlined"
			helperText={!inputValue && "Пожалуйста, введите название города"}
		/>
	)
})
