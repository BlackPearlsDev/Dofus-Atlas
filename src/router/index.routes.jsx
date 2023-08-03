import { Routes, Route } from "react-router-dom";

// Import Pages
import Home from "../Components/Pages/Home/Index";
import Equipements from "../Components/Pages/Equipements/Index";
import Montures from "../Components/Pages/Montures/Index";
import Almanax from "../Components/Pages/Almanax/Index";
import News from "../Components/Pages/News/Index";
import RessourceDetails from "../Components/Pages/RessourceDetails/Index";

function Router() {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/equipements" element={<Equipements />} />
            <Route path="/montures" element={<Montures />} />
            <Route path="/almanax" element={<Almanax />} />
            <Route path="/news" element={<News />} />
            <Route path="/ressource/:type/:id" element={<RessourceDetails />} />
        </Routes>
    );
}

export default Router;