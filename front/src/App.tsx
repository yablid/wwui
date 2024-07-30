// src/App.tsx
import React from "react";
console.log("React Version", React.version)
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

// Pages
import IndexPage from '@pages/index';
import AddWalletPage from './pages/addWallet';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import Register from './pages/register.jsx';
import MinimalPage from '@lib/components/MinimalPage.jsx';

// Layouts
import HomeLayout from "@lib/components/layouts/home/Layout";
import AuthLayout from '@lib/components/layouts/auth/Layout';
import authLoader from '@lib/components/layouts/auth/loader';
import ProtectedLayout from "@lib/components/layouts/protected/Layout.tsx";

// Context
import { MenuProvider } from '@lib/context/MenuContext.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<IndexPage />} >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<div>UNAUTHORIZED</div>} />

            <Route element={<AuthLayout />} loader = {authLoader}>
                <Route path="/min" element={<MinimalPage/>} />

                <Route element={<HomeLayout />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>

                <Route element={<ProtectedLayout allowedRoles={ ["user", "scout"]} />}>
                    <Route path="/wallet" element={<AddWalletPage />} />
                </Route>
            </Route>
      </Route>
  )
);

export default function App() {
    return (
        <MenuProvider>
            <RouterProvider router={router} fallbackElement={<LinearProgress/>}/>
        </MenuProvider>
    );
}

// loader={() => defer({ userPromise: authLoader() })}
