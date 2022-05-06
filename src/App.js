
import './App.css';
import './components/WeightedReturn'
import WeightedReturn from './components/WeightedReturn';
import Input from './components/Input'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <header>
        <h1>Annualized Weighted Returns</h1>
      </header>
      <main>
        <WeightedReturn />
        <Input />
      </main>
      <Footer />
    </>
  );
}

export default App;
