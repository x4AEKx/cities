import { Dispatch, memo, SetStateAction, useEffect, useState } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab"
import { FormControl, FormHelperText } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import styled from "styled-components"

type ColorPickerType = {
	colorPick?: string
	setColorPick?: Dispatch<SetStateAction<string>>
}

const colors = [
	"#F56F6F",
	"#ECAC62",
	"#F4E38A",
	"#CA8BA9",
	"#749BF8",
	"#FFC8EF",
	"#FFD2C8",
	"#C8CCDC",
	"#0BC5D1",
	"#9EE2A8",
	"#C8EC62",
	"#CCCD9E",
]

const Button = styled.div`
	background-color: ${(props) => props.color};
	width: 20px;
	height: 20px;
`

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	})
)

const StyledToggleButtonGroup = withStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		border: "1px solid #C4C4C4",
		width: "100%",
	},
	grouped: {
		margin: theme.spacing(0.5),
		border: "none",
		"&:not(:first-child)": {
			borderRadius: theme.shape.borderRadius,
		},
		"&:first-child": {
			borderRadius: theme.shape.borderRadius,
		},
		"&.Mui-selected": {
			border: "2px solid black",
		},
	},
}))(ToggleButtonGroup)

export const ColorPicker = memo(function ({ colorPick, setColorPick }: ColorPickerType) {
	const classes = useStyles()

	const [color, setColor] = useState("")

	useEffect(() => {
		if (colorPick) {
			setColor(colorPick)
		}
	}, [colorPick])

	const handleChangeColor = (event: React.MouseEvent<HTMLElement>, newColor: string) => {
		setColor(newColor)
		setColorPick && setColorPick(newColor)
	}

	return (
		<FormControl
			className={classes.formControl}
			required
			variant="outlined"
			fullWidth
			error={!color}
		>
			<StyledToggleButtonGroup exclusive value={color} onChange={handleChangeColor}>
				{colors.map((color) => {
					return (
						<ToggleButton key={color} value={color}>
							<Button color={color} />
						</ToggleButton>
					)
				})}
			</StyledToggleButtonGroup>
			{!color && <FormHelperText>Выберите цвет</FormHelperText>}
		</FormControl>
	)
})
