// src/lib/components/layouts/home/Layout.tsx
import { useEffect } from 'react';
import { useMenu } from '@lib/context/MenuContext.tsx';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@lib/context/AuthContext.tsx';

const HomeLayout = () => {

    console.log("rendering home layout")

    const { userData } = useAuth();
    console.log("HomeLayout UserData", userData)
    const { setPages } = useMenu();

    useEffect(() => {
        setPages([
            { label: "Index", path: '/'},
            { label: "Wallet", path: '/wallet'},
            { label: "min", path: '/min'}
        ])
    }, [setPages])

    useEffect( () => {
        return () => {
            console.log("HomeLayout unmounting")
        }
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};

export default HomeLayout;