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

    return (
        <div
            className={`overflow-hidden rounded-circle shadow border fw-bold ${bgColor[roundNumber]}`}
            style={{ width: width + 'px', height: height + 'px' }}
        >
            {imageUrl ? (
                <img src={imageUrl} width={width} height={height} alt={name} className="overflow-hidden rounded " />
            ) : name ? (
                <div
                    className="overflow-hidden rounded d-flex justify-content-center align-items-center "
                    style={{ width: width + 'px', height: height + 'px' }}
                >
                    {avatarName}
                </div>
            ) : (
                <PiUserCircle size={width} />
            )}
        </div>
    );
}
