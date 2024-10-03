import React from 'react';

import logo from '@/assets/logo.png';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <img src={logo} alt="logo" width={180} height={60} />
            </div>

            {children}
        </>
    );
}
