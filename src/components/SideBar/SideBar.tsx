import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { FiArrowUpLeft } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import routes from '@/config/routes';
import Avatar from '../Avatar/Avatar';
import { useAppSelector } from '@/redux/hook';
import { getUser } from '@/redux/userSlice';
import EditUserDetails from '../EditUserDetails/EditUserDetails';
import Divider from '../Divider/Divider';
import SearchUser from '../SearchUser/SearchUser';

export default function SideBar() {
    const user = useAppSelector(getUser);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);

    return (
        <div className="w-100 h-100 d-grid bg-white" style={{ gridTemplateColumns: '1.5fr 8fr' }}>
            <div
                className="h-100 py-4 d-flex flex-column justify-content-between w-100"
                style={{
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
                        onClick={() => setOpenSearchUser(true)}
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
                        <Avatar width="40" height="40" userId={user?._id} name={user?.name} imageUrl={user?.profile_pic} />
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

            <div>
                <div style={{ height: 'var(--height-header)' }}>
                    <h5 className="p-2 py-3 ">Message</h5>
                </div>

                <div style={{ padding: '0.5px', backgroundColor: 'rgba(22,24,35,0.2)' }}></div>

                <div className="px-2" style={{ height: 'calc(100vh - 65px)', overflowX: 'hidden', overflowY: 'auto' }}>
                    {allUser.length === 0 && (
                        <div className="mt-5">
                            <div className="d-flex justify-content-center align-items-center my-3">
                                <FiArrowUpLeft size={50} />
                            </div>
                            <p className="text-center" style={{ fontSize: '20px', color: 'rgba(22,24,35,0.5)' }}>
                                Explore users to start a conversation with
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/** edit user details */}
            {editUserOpen && <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />}

            {/** search user */}
            {openSearchUser && <SearchUser onClose={() => setOpenSearchUser(false)} />}
        </div>
    );
}
