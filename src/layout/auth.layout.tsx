import React from 'react';

import logo from '@/assets/logo.png';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    // return false;
    return !!localStorage.getItem('token'); // hoặc kiểm tra user info
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return isAuthenticated() ? (
        <Navigate to="/" />
    ) : (
        <>
            <header className="d-flex justify-content-center align-items-center py-3 shadow-sm bg-white">
                <img src={logo} alt="logo" width={180} height={60} />
            </header>

            {children}
        </>
    );
}
