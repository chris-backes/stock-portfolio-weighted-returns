import { useState } from "react";
import WeightedReturn from "./components/WeightedReturn";
import History from "./components/History";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	const [portfolio, setPortfolio] = useState(localStorage.getItem('current-value'))
	return (
		<>
			<Header />
			<main>
				<WeightedReturn portfolio={portfolio} />
				<History setPortfolio={setPortfolio} />
			</main>
			<Footer />
		</>
	);
}

export default App;
