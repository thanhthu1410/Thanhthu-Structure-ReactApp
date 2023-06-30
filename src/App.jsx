
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import LazyLoad from "./LazyLoad";
import NavBar from "@components/Navbars/Navbar";
function App() {
  return (
    <div className="App">
      <div className="app_container">
        <NavBar />
        <Routes>
          <Route path="" element={LazyLoad(() => import("@Pages/Homes/Home"))()} ></Route>
          <Route path="/about" element={LazyLoad(() => import("@Pages/Abouts/About"))()} >
              <Route path="my-infor" element={LazyLoad(() => import("@Pages/Abouts/MyInfors/MyInfor"))()} ></Route>
          </Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
