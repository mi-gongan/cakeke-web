import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import DetailPage from "./components/detailPage/DetailPage";
import Privacy from "./components/privacy/Privacy";
import Terms from "./components/terms/Terms";
import Location from "./components/location/Location";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
