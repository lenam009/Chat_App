import { useAppSelector } from '@/redux/hook';
import React from 'react';
import { PiUserCircle } from 'react-icons/pi';

interface IProp {
    userId?: string;
    name?: string;
    imageUrl?: string;
    width?: string;
    height?: string;
}

export default function Avatar({ userId, name, imageUrl, width, height }: IProp) {
    const onlineUser = useAppSelector((state) => state?.userSlice.onlineUser);

    let avatarName = '';

    if (name) {
        const splitName = name.split(' ');

        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    const bgColor = ['bg-light', 'bg-info', 'bg-danger', 'bg-primary', 'bg-warning'];

    //@ts-ignore
    const roundNumber = Math.floor(Math.random() * 5);

    const isOnline = onlineUser.includes(userId || '');

    return (
        <div className={` rounded-circle shadow border fw-bold position-relative`} style={{ width: width + 'px', height: height + 'px' }}>
            {imageUrl ? (
                <img src={imageUrl} width={width} height={height} alt={name} className="overflow-hidden rounded-circle " />
            ) : name ? (
                <div
                    className={`overflow-hidden rounded-circle d-flex justify-content-center align-items-center fs-5  ${bgColor[roundNumber]}`}
                    style={{ width: width + 'px', height: height + 'px' }}
                >
                    {avatarName}
                </div>
            ) : (
                <PiUserCircle size={width} />
            )}

            {isOnline && <div className="s p-2 position-absolute rounded-circle" style={{ bottom: -2, right: -2, backgroundColor: '#31A73B' }}></div>}
        </div>
    );
}
