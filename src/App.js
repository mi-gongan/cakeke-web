import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import DetailPage from "./components/detailPage/DetailPage";
import { RecoilRoot } from "recoil";
import Privacy from "./components/privacy/Privacy";
import Terms from "./components/terms/Terms";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
