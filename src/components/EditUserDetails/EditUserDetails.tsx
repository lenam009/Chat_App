import React from 'react';

interface IProps {
    onClose: () => void;
    data: IUser;
}
export default function EditUserDetails({ onClose, data }: IProps) {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(22,24,35,0.4)' }}
        >
            <div className="bg-white p-4 m-1 rounded w-25">
                <h5>Profile Details</h5>
                <p className="">Edit user details</p>
            </div>
        </div>
    );
}
