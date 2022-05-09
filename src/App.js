import "./App.css";
import "./components/WeightedReturn";
import WeightedReturn from "./components/WeightedReturn";
import History from "./components/History";
import Footer from "./components/Footer";
import Explanation from "./components/Explanation";

function App() {
	return (
		<>
			<header>
				<h1>Annualized Weighted Returns</h1>
			</header>
			<main>
				<section>
					{/* <WeightedReturn /> */}
					<Explanation />
				</section>
				<History />
			</main>
			<Footer />
		</>
	);
}

export default App;
