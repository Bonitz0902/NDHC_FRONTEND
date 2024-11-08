import {Outlet, useLocation, useNavigate} from "react-router-dom";
import "./App.css";
import {LandingPage} from "./pages/LandingPage";
import {NavigationBar} from './components/navigationBar';
import {useState} from "react";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(null);


    const getCurrentMenuKey = () => {
        const {pathname} = location;
        if (pathname.includes('/inventory-items')) {
            return 'inventory';
        }
        return 'home';
    };


    const selectedKeys = [getCurrentMenuKey()];

    return (
        <div className="App">
            <NavigationBar token={token}/>
            <div className="content">
                <LandingPage/>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;