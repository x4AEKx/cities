import { BrowserRouter, Switch, Route } from "react-router-dom"
import { memo } from "react"

import { Cities } from "./components/Cities/Cities"
import { City } from "./components/City/City"

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
