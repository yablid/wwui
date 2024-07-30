// src/pages/index.tsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useMenu } from '@lib/context/MenuContext';
import TopBar from "@lib/components/TopBar.tsx";

const IndexPage = () => {
    const { setPages } = useMenu();

    useEffect(() => {
        setPages([
            { label: 'Home', path: '/home' },
            { label: 'Wallet', path: '/wallet' },
        ])
    }, [ setPages ])

    return (
        <>
            <TopBar />
            <Outlet />
        </>
    )
}

export default IndexPage