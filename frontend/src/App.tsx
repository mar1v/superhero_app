import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeroesProvider } from "./context/HeroesProvider";
import Home from "./pages/Home";
import SuperheroDetails from "./pages/SuperheroDetails";

function App() {
  return (
    <HeroesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/superhero/:id" element={<SuperheroDetails />} />
        </Routes>
      </BrowserRouter>
    </HeroesProvider>
  );
}

export default App;
