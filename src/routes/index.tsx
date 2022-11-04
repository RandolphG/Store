import React, { FC, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router";
import { ProductPage, ProductDetails, Slider } from "../features";
import { PublicRoute } from "./helper";

/*A route object has the same properties as a <Route>.*/
let index: RouteObject[] = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <ProductPage />
      </PublicRoute>
    ),
  },
  {
    path: "/:id",
    element: (
      <PublicRoute>
        <ProductDetails />
      </PublicRoute>
    ),
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
