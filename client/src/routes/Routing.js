import Menu from "../pages/Menu"
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RefreshHandler from "../components/RefreshHandler";

const Routing = () => {

    const [isAuthenticate, setIsAuthenticate] = useState(false);

    const PrivateRoute = ({ element }) => {
        return isAuthenticate ? element : <Navigate to='/login' />
    }



    return (
        <div className="bg-black h-screen ">
            <BrowserRouter>
                <RefreshHandler setIsAuthenticate={setIsAuthenticate} />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
                    <Route path="/" element={<Menu />} />

                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default Routing
