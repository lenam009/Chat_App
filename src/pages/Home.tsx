import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axiosCreate from '@/api';

export default function Home() {
    const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user/user-details`;

    const fetchUserDetails = async () => {
        const result = (await axiosCreate
            .get(URL)
            .then((res) => {
                console.log('resFetchUserDetails', res);
                return res;
            })
            .catch((err) => null)) as IBackendRes<IUser> | null;
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

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
