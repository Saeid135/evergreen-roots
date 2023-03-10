import Connect from "./Connect";
import Home from "./Home";
import Reg_Con from "./Reg_Con";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Comment out the page that you would like to view
//Once the Routing is done, clicking on links on the page will allow you switch pages

export default function App() {
    return (
        <Home />
        // <Reg_Con />
        // <Connect />
    );
}

{/* <BrowserRouter>
    <Routes>
        <Route index element={<Home />} ></Route>
        <Route path="/reg-con" element={<Reg_Con />}></Route>
        <Route path="connect" element={<Connect />}></Route>
    </Routes>
</BrowserRouter> */}