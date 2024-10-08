import routes from '@/config/routes';
import uploadFile from '@/helpers/uploadFile';
import axios from 'axios';
import { url } from 'inspector';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosCreate from '@/api';

export default function RegisterPage() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        profile_pic: '',
    });

    const [uploadPhoto, setUploadPhoto] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const uploadPhoto = await uploadFile(file)
                .then((res) => res.json())
                .then((res) => {
                    console.log('res', res);
                    return res;
                })
                .catch((err) => console.log('error uploadPhoto', err));

            setUploadPhoto((prev) => file);
            setData((prev) => ({ ...prev, profile_pic: uploadPhoto.url }));
        }
    };

    const handleClearUploadPhoto = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setUploadPhoto(null);
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/auth/register`;

        const response = (await axiosCreate
            .post(URL, data)
            .then((res) => {
                //@ts-ignore
                toast.success(res.message);
                setData({
                    name: '',
                    email: '',
                    password: '',
                    profile_pic: '',
                });
                navigate(routes.email.path);
                return res;
            })
            .catch((err) => null)) as IBackendRes<IUser> | null;

        console.log('data', data);
    };

    return (
        <div className="mt-5">
            <div className="bg-white w-100  rounded overflow-hidden p-4 mx-auto" style={{ maxWidth: '30%' }}>
                <h5 className="my-0" style={{ color: '#00acb4' }}>
                    Welcome to Chat app!
                </h5>

                <form className="d-grid gap-1 mt-2" onSubmit={handleOnSubmit}>
                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="name" className=" col-form-label">
                            Name:
                        </label>
                        <div className="">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                className="form-control"
                                value={data.name}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                    </div>

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

                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="profile_pic" className="col-form-label">
                            Photo:
                            <div
                                className="d-flex justify-content-center align-items-center rounded mt-2"
                                style={{ backgroundColor: '#E2E8F0', height: '100%', cursor: 'pointer' }}
                            >
                                <p className="m-0" style={{ maxWidth: '300px' }}>
                                    {uploadPhoto ? uploadPhoto.name : ' Upload profile photo'}
                                </p>

                                {uploadPhoto && (
                                    <button
                                        type="button"
                                        className="d-flex mx-2 btn btn-outline-danger btn-sm"
                                        onClick={handleClearUploadPhoto}
                                    >
                                        <IoClose />
                                    </button>
                                )}
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile_pic"
                            name="profile_pic"
                            className="form-control visually-hidden"
                            onChange={handleUploadPhoto}
                        />
                    </div>

                    <button type="submit" className="btn btn-info mt-5 text-white fw-bold">
                        Register
                    </button>
                </form>

                <p className="my-2 text-center">
                    Already have account ?{' '}
                    <Link className="fw-bold" to={routes.email.path}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
