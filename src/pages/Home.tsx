import React from 'react';
import { Outlet } from 'react-router-dom';

export default function home() {
    return (
        <div>
            home
            {/* Message component */}
            <section>
                <Outlet />
            </section>
        </div>
    );
}
