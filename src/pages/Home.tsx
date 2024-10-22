import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axiosCreate from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getUser, logout, setOnlineUser, setUser } from '@/redux/userSlice';
import routes from '@/config/routes';
import { Height } from '@mui/icons-material';
import SideBar from '@/components/SideBar/SideBar';
import logo from '@/assets/logo.png';
import io from 'socket.io-client';

export default function Home() {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    let basePath = location.pathname === '/';

    console.log('basePath', basePath);

    const fetchUserDetails = async () => {
        const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user/user-details`;
        const result = (await axiosCreate
            .get(URL)
            .then((res) => {
                console.log('resFetchUserDetails', res);
                dispatch(setUser(res.data));

                return res;
            })
            .catch((err) => {
                if (err.logout) {
                    dispatch(logout());
                    navigate(routes.email.path);
                }
                return null;
            })) as IBackendRes<IUser> | null;
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    /** Socket Connection */
    useEffect(() => {
        const socketConnection = io('http://localhost:8080', {
            auth: {
                token: localStorage.getItem('token'),
            },
        });

        socketConnection.on('onlineUser', (data) => {
            console.log('data', data);
            dispatch(setOnlineUser(data));
        });

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    return (
        <div className="d-grid " style={{ gridTemplateColumns: '2fr 8fr', height: '100vh' }}>
            <section className={`bg-white `}>
                <SideBar />
            </section>

            {/* Message component */}
            <section className={`${basePath && 'd-none'}`}>
                <Outlet />
            </section>

            {/**Logo */}
            <div className={`d-flex justify-content-center align-items-center flex-column gap-3 ${!basePath && 'd-none'}`}>
                <div>
                    <img src={logo} width={230} alt="logo" />
                </div>
                <p style={{ color: 'rgba(22,24,35,.5)' }}>Select user to send message</p>
            </div>
        </div>
    );
}
