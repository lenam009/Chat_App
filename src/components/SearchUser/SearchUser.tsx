import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface IProps {
    onClose: () => void;
}

const SearchUser = ({ onClose }: IProps) => {
    return (
        <div className="position-fixed fixed-top fixed-bottom p-2" style={{ backgroundColor: 'rgba(22,24,35,0.3)' }}>
            <div className="mx-auto mt-5" style={{ maxWidth: '40%' }}>
                {/** Input Search User */}
                <div className="bg-white rounded overflow-hidden d-flex" style={{ height: '48px' }}>
                    <input className="w-100 h-100 py-1 px-3" type="text" placeholder="Search user by name, email..." />
                    <div className="d-flex align-items-center " style={{ height: '48px', width: '32px' }}>
                        <IoSearchOutline size={25} />
                    </div>
                </div>

                {/**Display search user */}
            </div>
        </div>
    );
};

export default SearchUser;
