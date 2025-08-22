import Admin from "../pages/Admin";
import Menu from "../pages/Menu"
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Routing = () => {
    return (
        <div className="bg-black h-screen ">
            <BrowserRouter>

                <Routes>

                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/" element={<Menu />} />

                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default Routing
