import React from 'react';
import styles from './SideBar.module.scss';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import routes from '@/config/routes';

export default function SideBar() {
    return (
        <div className="w-100 h-100">
            <div
                className="h-100 py-4"
                style={{
                    width: '16%',
                    backgroundColor: 'rgba(22,24,35,0.09)',
                    borderRadius: '0px 16px 16px 0px',
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
                        <IoChatbubbleEllipses size={25} />
                    </NavLink>

                    <div
                        className={`py-3 d-flex justify-content-center align-items-center ${styles['message']}`}
                        style={{ cursor: 'pointer' }}
                        title="chat"
                    >
                        <FaUserPlus size={25} />
                    </div>
                </div>

                <div
                    className={`py-3 d-flex justify-content-center align-items-center ${styles['message']}`}
                    style={{ cursor: 'pointer' }}
                    title="chat"
                >
                    <TbLogout2 size={25} />
                </div>
            </div>
        </div>
    );
}
