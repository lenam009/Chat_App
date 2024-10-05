import React, { useState } from 'react';

export default function RegisterPage() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        profile_pic: '',
    });

    const [uploadPhoto, setUploadPhoto] = useState<File | null>(null);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setUploadPhoto(file);
        }
    };

    return (
        <div className="mt-5">
            <div className="bg-white w-100 mx-2 rounded overflow-hidden p-4" style={{ maxWidth: '30%' }}>
                <h5 className="my-0" style={{ color: '#00acb4' }}>
                    Welcome to Chat app!
                </h5>

                <form className="d-grid gap-1 mt-2">
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
                        <label htmlFor="profile_pic" className=" col-form-label">
                            Photo:
                            <div
                                className="d-flex justify-content-center align-items-center rounded "
                                style={{ backgroundColor: '#E2E8F0', height: '100%', cursor: 'pointer' }}
                            >
                                <p className="m-0">{uploadPhoto ? uploadPhoto.name : ' Upload profile photo'}</p>
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile_pic"
                            name="profile_pic"
                            className="form-control visually-hidden"
                            value={data.profile_pic}
                            onChange={handleUploadPhoto}
                            required
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
