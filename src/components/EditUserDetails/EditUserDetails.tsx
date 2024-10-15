import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';

interface IProps {
    onClose: () => void;
    user: IUser;
}

const EditUserDetails = ({ onClose, user }: IProps) => {
    const [data, setData] = useState({
        name: user?.name,
        profile_pic: user?.profile_pic,
    });

    useEffect(() => {
        setData((prev) => ({ ...prev, ...user }));
    }, [user]);

    console.log('EditUserDetails_user', user);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(22,24,35,0.4)' }}
        >
            <div className="bg-white p-4 m-1 my-5 rounded w-25">
                <h5>Profile Details</h5>
                <p className="">Edit user details</p>

                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="">
                            Name:
                        </label>
                        <div className="my-1">
                            <input type="name" className="form-control" id="name" name="name" value={data.name} onChange={handleOnChange} />
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="profile_pic" className="">
                            Photo:
                        </label>
                        <div className="my-1 d-flex align-items-center gap-4">
                            <Avatar width="40" height="40" name={data?.name} imageUrl={data?.profile_pic} />
                            <button type="button" className="btn btn-outline-primary">
                                Change photo
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(EditUserDetails);
