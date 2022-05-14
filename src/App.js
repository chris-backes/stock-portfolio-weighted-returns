import { useState } from "react";
import WeightedReturn from "./components/WeightedReturn";
import History from "./components/History";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Grid } from "@mui/material";
import { grabStorage } from "./utils/storage.js";

function App() {
	const [portfolio, setPortfolio] = useState(
		localStorage.getItem("current-value") ?? "0"
	);
	const [transactionHistory, setTransactionHistory] = useState(grabStorage());
	return (
		<>
			<Header />
			<Grid container component="main">
				<Grid item sm={12} md={6}>
					<WeightedReturn portfolio={portfolio} transactionHistory={transactionHistory} />
				</Grid>
				<Grid item sm={12} md={6}>
					<History setPortfolio={setPortfolio} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory}/>
				</Grid>
			</Grid>
			<Footer />
		</>
	);
}

export default App;
