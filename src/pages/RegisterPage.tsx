import React, { useState } from 'react';

export default function RegisterPage() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        profile_pic: '',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    return (
        <div className="mt-5">
            <div className="bg-white w-100 mx-2 rounded overflow-hidden p-4" style={{ maxWidth: '30%' }}>
                <h5 className="my-0" style={{ color: '#00acb4' }}>
                    Welcome to Chat app!
                </h5>

                <form>
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
                </form>
            </div>
        </div>
    );
}
