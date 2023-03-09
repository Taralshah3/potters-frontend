import {
    Route,
    Routes,
} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import AuthNavbar from "./components/AuthNavbar";
import NoAuthNavbar from "./components/NoAuthNavarbar";
import NotFound from "./views/NotFound";


const Router = () => {
    return (
        <Routes>
            <Route element={<NoAuthNavbar />}>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/user" element={<AuthNavbar />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="error" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default Router;