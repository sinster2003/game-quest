import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { BuyOrSell, CustomerDashboard, Landing, Login, OwnerDashboard, Signup } from "../pages";

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
            }
        ]
    }
])

const Routes = () => {
    return <RouterProvider router={router}/>
}

export default Routes;