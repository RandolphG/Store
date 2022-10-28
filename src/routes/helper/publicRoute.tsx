import React from "react";
import { Navigate, useLocation } from "react-router";

/**
 * PublicRoute
 * @param {React.Component} Component
 * @returns {JSX.Element}
 */
export function PublicRoute({ children }: any) {
    let location = useLocation();

    const navigateTo = {
        pathname: "/home",
        state: { from: location },
    };

    function useAuth() {
        return true;
    }

    const isAuthenticated = useAuth();

    return !isAuthenticated ? <Navigate to={navigateTo} /> : children;
}
