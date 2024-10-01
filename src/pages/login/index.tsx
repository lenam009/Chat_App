import routes from '@/config/routes';
import React from 'react';
import { useMatch } from 'react-router-dom';

export default function LoginPage() {
    const match = useMatch(routes.login.path);

    console.log('match', match);

    return (
        <div>
            <h1>LoginPage</h1>
        </div>
    );
}
