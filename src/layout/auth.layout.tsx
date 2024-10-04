import React from 'react';

import logo from '@/assets/logo.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="d-flex justify-content-center align-items-center py-3 shadow-sm bg-white">
                <img src={logo} alt="logo" width={180} height={60} />
            </header>

            {children}
        </>
    );
}
