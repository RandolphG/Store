import React from "react";
import { Navigate, useLocation } from "react-router";

/**
 * PrivateRoute
 * @param {React.Component} Component
 * @returns {React.Component}
 */
export function PrivateRoute({ children }: any) {
    let location = useLocation();

    const navigateTo = {
        pathname: "/dashboard",
        state: { from: location },
    };

    function useAuth() {
        return true;
    }

    const isAuthenticated = useAuth();

    return isAuthenticated ? children : <Navigate to={navigateTo} />;
}
