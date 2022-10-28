import React, { FC, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router";
import { Navbar } from "../features";
import { PublicRoute } from "./helper";

/*A route object has the same properties as a <Route>
element. The `children` is just an array of child routes.*/
const DEFAULT = () => <div>DEFAULT</div>;

let index: RouteObject[] = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <Navbar />
      </PublicRoute>
    ),
    children: [
      { index: true, element: <DEFAULT /> },
      { path: "/signIn", element: <div /> },
      { path: "/registration", element: <div /> },
    ],
  },
  { path: "*", element: <div /> },
];

/**
 * application router
 * @returns {JSX.Element}
 */
const AppRouter: FC = () => {
  let element = useRoutes(index);

  return <Suspense fallback={<></>}>{element}</Suspense>;
};

export default AppRouter;