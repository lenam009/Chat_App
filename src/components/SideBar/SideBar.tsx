import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import routes from '@/config/routes';
import Avatar from '../Avatar/Avatar';
import { useAppSelector } from '@/redux/hook';
import { getUser } from '@/redux/userSlice';
import EditUserDetails from '../EditUserDetails/EditUserDetails';

export default function SideBar() {
    const user = useAppSelector(getUser);
    const [editUserOpen, setEditUserOpen] = useState(false);

    return (
        <div className="w-100 h-100">
            <div
                className="h-100 py-4 d-flex flex-column justify-content-between"
                style={{
                    width: '15%',
                    backgroundColor: 'rgba(22,24,35,0.09)',
                    borderRadius: '0px 8px 8px 0px',
                }}
            >
                <div>
                    <NavLink
                        className={({ isActive }) => `py-3 d-flex justify-content-center align-items-center ${styles['message']} `}
                        style={({ isActive }) => {
                            return { cursor: 'pointer', backgroundColor: isActive ? 'rgba(22, 24, 35, 0.1)' : '' };
                        }}
                        title="chat"
                        to={'/'}
                    >
                        <IoChatbubbleEllipses size={20} />
                    </NavLink>

                    <div
                        className={`py-3 d-flex justify-content-center align-items-center ${styles['message']}`}
                        style={{ cursor: 'pointer' }}
                        title="add friend"
                    >
                        <FaUserPlus size={20} />
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center">
                    <button
                        className={`py-3 d-flex justify-content-center align-items-center ${styles['message']}`}
                        style={{ cursor: 'pointer', width: '100%' }}
                        title={user?.name}
                        onClick={() => setEditUserOpen(true)}
                    >
                        <Avatar width="40" height="40" name={user?.name} imageUrl={user?.profile_pic} />
                    </button>
                    <button
                        className={`py-3 d-flex justify-content-center align-items-center ${styles['message']}`}
                        style={{ cursor: 'pointer', width: '100%' }}
                        title="logout"
                    >
                        <TbLogout2 size={20} className="me-2" />
                    </button>
                </div>
            </div>

            {/** edit user details */}
            {editUserOpen && <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />}
        </div>
    );
}
