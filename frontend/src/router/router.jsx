import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { BuyOrSell, CustomerDashboard, Landing, Login, OwnerDashboard, Signup } from "../pages";
import Shopping from "../pages/Shopping";
import GameDetails from "../pages/GameDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Landing/>
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/buy-or-sell",
                element: <BuyOrSell/>
            },
            {
                path: "/customer-dashboard",
                element: <CustomerDashboard />
            },
            {
                path: "/owner-dashboard",
                element: <OwnerDashboard />
            },
            {
                path: "/shop-now",
                element: <Shopping/>
            }, 
            {
                path: "/game-details/:id",
                element: <GameDetails/>
            }
        ]
    }
])

const Routes = () => {
    return <RouterProvider router={router}/>
}

export default Routes;