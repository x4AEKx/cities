import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { ChangeEvent, memo, useEffect, useState } from "react"

type SelectFontSizeType = {
	fontSize?: string
	setFontSize?: (e: string) => void
}

const values = ["80", "90", "100", "110", "120", "130", "140", "150", "160"]

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	})
)

export const SelectFontSize = memo(function ({ fontSize, setFontSize }: SelectFontSizeType) {
	const classes = useStyles()

	const [size, setSize] = useState("")

	useEffect(() => {
		if (fontSize) {
			setSize(fontSize)
		}
	}, [fontSize])

	const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
		setSize(e.target.value as string)
		setFontSize && setFontSize(e.target.value as string)
	}

	return (
		<FormControl
			className={classes.formControl}
			required
			variant="outlined"
			fullWidth
			error={!size}
		>
			<InputLabel>Кегель</InputLabel>
			<Select label="Кегель" onChange={handleChange} value={size}>
				{values.map((value) => {
					return (
						<MenuItem key={value} value={value}>
							{value}
						</MenuItem>
					)
				})}
			</Select>
			{!size && <FormHelperText>Выберите размер шрифта</FormHelperText>}
		</FormControl>
	)
})
