// src/lib/components/layouts/protected/auth
import React, {useEffect} from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@lib/context/AuthContext.tsx';
import {useMenu} from "@lib/context/MenuContext.tsx";

type ProtectedLayoutProps = {
    allowedRoles: string[];
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ allowedRoles }) => {

    console.log("Rendering ProtectedLayout");

    const { setPages } = useMenu();
    const { userData } = useAuth();
    console.log("With userData", userData);

    useEffect(() => {
        setPages([
            { label: "Index", path: '/'},
            { label: "Wallet", path: '/wallet'},
            { label: "min", path: '/min'}
        ])
    }, [setPages])

    const location = useLocation();

    // Check if the user has any of the allowed roles
    const hasRequiredRole = userData?.roles?.some((role: string) => allowedRoles.includes(role));

    return (
        hasRequiredRole ? (
            <Outlet />
        ) : userData ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default ProtectedLayout;