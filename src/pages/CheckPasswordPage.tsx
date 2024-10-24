import routes from '@/config/routes';
import uploadFile from '@/helpers/uploadFile';
import axios from 'axios';
import { url } from 'inspector';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { PiUserCircle } from 'react-icons/pi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosCreate from '@/api';
import Avatar from '@/components/Avatar/Avatar';
import { useAppDispatch } from '@/redux/hook';
import { setToken, setUser } from '@/redux/userSlice';

export default function CheckPasswordPage() {
    const [data, setData] = useState({
        password: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const stateLocation = location?.state as IUser;

    console.log('stateLocation', stateLocation);

    useEffect(() => {
        if (!stateLocation || !stateLocation.name) {
            navigate(routes.email.path);
        }
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/auth/password`;

        const response = (await axiosCreate
            .post(URL, { userId: stateLocation?._id, password: data.password })
            .then((res) => {
                //@ts-ignore
                toast.success(res.message);
                //@ts-ignore
                dispatch(setToken(res.token));
                //@ts-ignore
                localStorage.setItem('token', res.token);
                setData({
                    password: '',
                });
                navigate(routes.home.path);
            })
            .catch((err) => null)) as IBackendRes<IUser> | null;

        console.log('data', data);
    };

    return (
        <div className="mt-5">
            <div className="bg-white w-100  rounded overflow-hidden p-4 mx-auto" style={{ maxWidth: '30%' }}>
                <div className="mb-3 d-flex flex-column align-items-center">
                    <Avatar width="70" height="70" name={stateLocation?.name} imageUrl={stateLocation?.profile_pic} />
                    <h5 className="mt-2">{stateLocation?.name}</h5>
                </div>

                <h5 className="my-0" style={{ color: '#00acb4' }}>
                    Welcome to Le Nam Chat app!
                </h5>

                <form className="d-grid gap-1 mt-2" onSubmit={handleOnSubmit}>
                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="password" className=" col-form-label">
                            Password:
                        </label>
                        <div className="">
                            <input
                                type="text"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="form-control"
                                value={data.password}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info mt-5 text-white fw-bold">
                        Login
                    </button>
                </form>

                <p className="my-2 text-center">
                    <Link className="fw-bold" to={routes.forgot_password.path}>
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
}
