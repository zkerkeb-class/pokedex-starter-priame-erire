import {
    createBrowserRouter
} from "react-router"

import Home from "./screens/Home"
import Pokemon from "./screens/pokemon";


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
    
    /*,
    {
        path: "/create",
        Component: Create
    },
    {
        path: "/edit/:id",
        Component: Edit
    }
    */
])

export default router;