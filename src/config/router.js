import {
    createBrowserRouter
} from "react-router"

import Home from "./screens/Home"
import Pokemon from "./screens/pokemon";
import Create from "./screens/Create";
import Edit from "./screens/Edit";
import Connec from "./screens/Connec";
import Cruser from "./screens/Cruser";


console.log("Dis mois si tu passe par ici V1");
const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/pokemon/:id",
        Component: Pokemon
    },
    {
        path: "/create",
        Component: Create
    },
    {
        path: "/edit/:id",
        Component: Edit
    },
    {
        path: "/connection/",
        Component: Connec
    },
    {
        path: "/create_account/",
        Component: Cruser
    }
])

export default router;