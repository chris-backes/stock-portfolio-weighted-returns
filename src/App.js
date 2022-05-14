import { useState, useEffect } from "react";
import WeightedReturn from "./components/WeightedReturn";
import History from "./components/History";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FirstTime from "./components/FirstTime";
import { Grid } from "@mui/material";
import { grabStorage } from "./utils/storage.js";
import dataset from "./assets/data";

function App() {
	const [portfolio, setPortfolio] = useState(
		localStorage.getItem("current-value") ?? "0"
	);
	const [transactionHistory, setTransactionHistory] = useState(grabStorage());
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			if (portfolio === "0" || !transactionHistory.length) setOpen(true);
		}, 2000);
	}, []);
	return (
		<>
			<Header />
			<FirstTime open={open} setOpen={setOpen} />
			<Grid container component="main">
				<Grid item sm={12} md={6}>
					<WeightedReturn
						portfolio={portfolio ?? 10248.21}
						transactionHistory={
							transactionHistory.length
								? transactionHistory
								: dataset
						}
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<History
						setPortfolio={setPortfolio}
						transactionHistory={
							transactionHistory.length
								? transactionHistory
								: dataset
						}
						setTransactionHistory={setTransactionHistory}
					/>
				</Grid>
			</Grid>
			<Footer />
		</>
	);
}

export default App;
