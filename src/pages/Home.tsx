import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axiosCreate from '@/api';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getUser, logout, setUser } from '@/redux/userSlice';
import routes from '@/config/routes';
import { Height } from '@mui/icons-material';
import SideBar from '@/components/SideBar/SideBar';
import logo from '@/assets/logo.png';

export default function Home() {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const basePath = location.pathname === '/';
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

    return (
        <div className="d-grid " style={{ gridTemplateColumns: '2fr 8fr', height: '100vh' }}>
            <section className={`bg-white ${!basePath && 'd-none'}`}>
                <SideBar />
            </section>

            {/* Message component */}
            <section className={`${basePath && 'd-none'}`}>
                <Outlet />
            </section>

            <div className="d-flex justify-content-center align-items-center flex-column gap-3">
                <div>
                    <img src={logo} width={230} alt="logo" />
                </div>
                <p style={{ color: 'rgba(22,24,35,.5)' }}>Select user to send message</p>
            </div>
        </div>
    );
}
