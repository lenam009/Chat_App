import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axiosCreate from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getUser, logout, setOnlineUser, setSocketConnection, setUser } from '@/redux/userSlice';
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

    let basePath: boolean = location.pathname === '/';

    // console.log('basePath', basePath);

    const fetchUserDetails = async () => {
        const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user/user-details`;
        const result = (await axiosCreate
            .get(URL)
            .then((res) => {
                // console.log('resFetchUserDetails', res);
                dispatch(setUser(res.data));

                return res;
            })
            .catch((err) => {
                // if (err.logout) {

                localStorage.removeItem('token');
                dispatch(logout());
                navigate(routes.email.path);

                return null;
            })) as IBackendRes<IUser> | null;
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    /** Socket Connection */
    useEffect(() => {
        const socketConnection = io(process.env.REACT_APP_PUBLIC_BACKEND_ORIGIN_URL, {
            auth: {
                token: localStorage.getItem('token'),
            },
        });

        socketConnection.on('onlineUser', (data) => {
            dispatch(setOnlineUser(data));
        });

        dispatch(setSocketConnection(socketConnection));

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    const isAuthenticated = () => {
        return !!localStorage.getItem('token'); // hoặc kiểm tra user info
    };

    return !isAuthenticated() ? (
        <Navigate to={routes.email.path} />
    ) : (
        <div className="d-grid " style={{ gridTemplateColumns: '2fr 8fr', height: '100vh' }}>
            <section className={`bg-white `}>
                <SideBar />
            </section>

            {basePath ? (
                /**Logo */
                <div className={`d-flex justify-content-center align-items-center flex-column gap-3 `}>
                    <div>
                        <img src={logo} width={230} alt="logo" />
                    </div>
                    <p style={{ color: 'rgba(22,24,35,.5)' }}>Select user to send message</p>
                </div>
            ) : (
                user.socketConnection &&
                user.socketConnection.connected && (
                    /* MessagePage component */
                    <section>
                        <Outlet />
                    </section>
                )
            )}
        </div>
    );
}
