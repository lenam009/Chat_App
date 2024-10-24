import routes from '@/config/routes';
import uploadFile from '@/helpers/uploadFile';
import axios from 'axios';
import { url } from 'inspector';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { PiUserCircle } from 'react-icons/pi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosCreate from '@/api';

export default function CheckEmailPage() {
    const [data, setData] = useState({
        email: '',
    });

    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/auth/email`;

        const response = (await axiosCreate
            .post(URL, data)
            .then((res) => {
                //@ts-ignore
                toast.success(res.message);
                setData({
                    email: '',
                });
                navigate(routes.password.path, {
                    state: res?.data,
                });
            })
            .catch((err) => null)) as IBackendRes<IUser> | null;

        console.log('data', data);
    };

    return (
        <div className="mt-5">
            <div className="bg-white w-100  rounded overflow-hidden p-4 mx-auto" style={{ maxWidth: '30%' }}>
                <div className="mb-3">
                    <PiUserCircle size={70} className="mx-auto d-flex" />
                </div>

                <h5 className="my-0" style={{ color: '#00acb4' }}>
                    Welcome to Le Nam Chat app!
                </h5>

                <form className="d-grid gap-1 mt-2" onSubmit={handleOnSubmit}>
                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="email" className=" col-form-label">
                            Email:
                        </label>
                        <div className="">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="form-control"
                                value={data.email}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info mt-5 text-white fw-bold">
                        Let's Go
                    </button>
                </form>

                <p className="my-2 text-center">
                    New User ?{' '}
                    <Link className="fw-bold" to={routes.register.path}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
