import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screensStudy/Home";
import About from "../screensStudy/About";
import Header from "../componentsStudy/Header";

const Router = () => {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;