import { createBrowserRouter } from "react-router-dom";
import Home from "../component/home/Home";
import Dashboard from "../component/pages/Dashboard";
import Setup from "../component/pages/Setup";
import ChatApp from "../component/pages/chatApp/ChatApp";
import ReactMotionEg from "../component/pages/ReactMotionEg";
import LoginPage from "../component/pages/loginSignup/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ScreenShare from "../component/pages/startScreenShare/startScreenShare";

const  Routing = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute> <Home /> </ProtectedRoute>,
        // element: <ProtectedRoute><Home /></ProtectedRoute>,
        children: [
         { path: "/dashboard", element: <Dashboard />, },
         { path: "/setup", element: <Setup />, 
          children : [
            {path : "ChatApp", element: <ChatApp />},
            // {path : "ReactMotionEg", element: <> <ReactMotionEg /></>},
            {path : "ScreenShare", element: <> <ScreenShare  /></>}
          ]
         },
        //   { path: "/Account", element: <Account />,
        //   children: [
        //     { path: "UserProfile", element: <UserProfile />, },
        //     { path: "Addresses", element: <DefaultAddress />, },
        //     { path: "Wishlist", element: <Wishlist />, },
        //     { path: "orders", element: <Orders />, },
        //   ]
        //  },
    
        ],
      },
      {
        path: "/login", element: <LoginPage/>
      }
]);

export default Routing;