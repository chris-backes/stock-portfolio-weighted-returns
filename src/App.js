import { useState } from "react";
import WeightedReturn from "./components/WeightedReturn";
import History from "./components/History";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Grid } from "@mui/material";

function App() {

	const [portfolio, setPortfolio] = useState(
		localStorage.getItem("current-value")
	);
	return (
		<>
			<Header />
			<Grid container component="main">
				<Grid item sm={12} md={6}>
					<WeightedReturn portfolio={portfolio} />
				</Grid>
				<Grid item sm={12} md={6}>
					<History setPortfolio={setPortfolio} />
				</Grid>
			</Grid>
			<Footer />
		</>
	);
}

export default App;
