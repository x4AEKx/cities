import { memo } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Cities } from "./Cities"
import { City } from "./City"

export const App = memo(function () {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/city/:cityId?">
					<City />
				</Route>
				<Route path="/">
					<Cities />
				</Route>
			</Switch>
		</BrowserRouter>
	)
})
