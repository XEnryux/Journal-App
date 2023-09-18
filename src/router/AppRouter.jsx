
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
  import { AuthRouter, AuthRoutes } from "../auth/routes";
  import { JournalRouter, JournalRoutes } from "../journal/routes";
  import { ErrorPage } from "../ui/ErrorPage";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckAuth";

  
  const routesConfig = createBrowserRouter([
    {
      path: "/auth",
      // ? Login Y registro
      element: (
        //   <PublicRoute>
        <AuthRouter />
        //   </PublicRoute>
      ),
      children: AuthRoutes,
      errorElement: <ErrorPage />,
    },
    {
      // ? Journalist App
      path: "/",
      element: (
        //   <PrivateRoute>
        <JournalRouter />
        //   </PrivateRoute>
      ),
      children: JournalRoutes,
      errorElement: <ErrorPage />,
    },
    {
      path: "/*",
      element: <Navigate to={"/"} />,
    },
  ]);
  
  export const AppRouter = () => {

   const {status}=useCheckAuth();

    if (status === 'checking') {
      return <CheckingAuth/>
      
    }
    return <RouterProvider router={routesConfig} />;
  };