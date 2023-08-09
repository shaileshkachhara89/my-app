import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBarTop} from "./components/common/NavBarTop";
import {NavSideBar} from "./components/common/NavSideBar";
import {Configuration} from "./components/main/Configuration";

function Main() {
  return (
    <BrowserRouter>
    <NavBarTop />
    <div className="container-fluid">
      <div className="row">
        <div className="col-2" style={{width:'240px'}}><NavSideBar /></div>
        <div className="col-10">
          <Routes>
            <Route path="configuration" element={<Configuration />} />
          </Routes>
        </div>
      </div>
    </div>  
  </BrowserRouter>
  );
}

export default Main;
