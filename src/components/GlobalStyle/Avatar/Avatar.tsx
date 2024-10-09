import React from 'react';
import { PiUserCircle } from 'react-icons/pi';

interface IProp {
    userId: string;
    name: string;
    imageUrl: string;
    width: string;
    height: string;
}

export default function Avatar({ userId, name, imageUrl, width, height }: IProp) {
    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} width={width} height={height} alt={name} />
            ) : name ? (
                <div></div>
            ) : (
                <PiUserCircle size={width} />
            )}
        </div>
    );
}
