// src/lib/components/layouts/auth/Auth.tsx
import { useEffect } from 'react';
import { Suspense } from 'react';
import {
    useLoaderData, Outlet, Await, Navigate
} from 'react-router-dom';
import { useAuth } from '@lib/context/AuthContext';
import type { UserData } from '@appTypes/types';

import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

const AuthLayout = () => {
    console.log("Loading auth layout...");

    const { setUserData } = useAuth();
    const userData = useLoaderData() as UserData | null;

    useEffect(() => {
        setUserData(userData);
    }, [userData, setUserData]);

    console.log("Auth loader userData: ", userData);
    return (
        <>
            <Suspense fallback={<LinearProgress />}>
                <Await
                    resolve={userData}
                    errorElement={<Alert severity="error">Something went wrong!</Alert>}
                >
                    {userData ? <Outlet /> : <Navigate to="/login" replace={true} />}
                </Await>
            </Suspense>
        </>
    );
};

export default AuthLayout;
