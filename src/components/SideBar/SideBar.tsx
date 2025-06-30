import React, { useEffect, useState } from 'react';
import styles from './SideBar.module.scss';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { FiArrowUpLeft } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import routes from '@/config/routes';
import Avatar from '../Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getUser, logout } from '@/redux/userSlice';
import EditUserDetails from '../EditUserDetails/EditUserDetails';
import Divider from '../Divider/Divider';
import SearchUser from '../SearchUser/SearchUser';
import { FaPlus, FaImage } from 'react-icons/fa6';
import { FaAngleLeft, FaVideo } from 'react-icons/fa';

interface IConversationUserData extends IConversation {
    userDetails: IUser;
}

export default function SideBar() {
    const currentUser = useAppSelector(getUser);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState<IConversationUserData[]>([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    console.log('allUser', allUser);

    const logoutBtn = (e: React.MouseEvent<HTMLElement>) => {
        localStorage.removeItem('token');
        socketConnection.disconnect(currentUser._id);
        dispatch(logout());
        navigate(routes.email.path);
    };

    const socketConnection = useAppSelector((state) => state?.userSlice?.socketConnection);

    useEffect(() => {
        if (socketConnection && currentUser?._id) {
            // console.log('currentUser', currentUser._id);

            socketConnection.emit('sidebar', currentUser._id);

            socketConnection.on('conversation', (data: IConversation[]) => {
                // console.log('conversation', data);

                const conversationUserData: IConversationUserData[] = data.map((cvs) => {
                    if (cvs.receiver._id !== currentUser._id) {
                        return {
                            ...cvs,
                            userDetails: cvs.receiver,
                        };
                    } else {
                        return {
                            ...cvs,
                            userDetails: cvs.sender,
                        };
                    }
                });

                setAllUser(conversationUserData);
            });
        }
    }, [socketConnection, currentUser]);

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
                        title={currentUser?.name}
                        onClick={() => setEditUserOpen(true)}
                    >
                        <Avatar width="40" height="40" userId={currentUser?._id} name={currentUser?.name} imageUrl={currentUser?.profile_pic} />
                    </button>
                    <button
                        className={`py-3 d-flex justify-content-center align-items-center ${styles['message']}`}
                        style={{ cursor: 'pointer', width: '100%' }}
                        title="logout"
                        onClick={logoutBtn}
                    >
                        <TbLogout2 size={20} className="me-2" />
                    </button>
                </div>
            </div>

            {/* Message Box */}
            <div>
                <div style={{ height: 'var(--height-header)' }}>
                    <h5 className="p-2 py-3 ">Message</h5>
                </div>

                <div style={{ padding: '0.5px', backgroundColor: 'rgba(22,24,35,0.2)' }}></div>

                <div className="" style={{ height: 'calc(100vh - 65px)', overflowX: 'hidden', overflowY: 'auto' }}>
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

                    {allUser.map((cvs) => (
                        <NavLink
                            to={routes.userId.pathOrigin + cvs.userDetails._id}
                            className={`d-flex align-items-center gap-2 p-1 py-2  rounded  ${styles['conversation']}`}
                            key={cvs?._id}
                        >
                            <div>
                                <Avatar imageUrl={cvs.userDetails?.profile_pic} name={cvs.userDetails?.name} width="40" height="40" />
                            </div>
                            <div>
                                <h5 className="">{cvs.userDetails.name}</h5>
                                {/* Last message */}
                                <div className="d-flex align-items-center ">
                                    <div className="d-flex align-items-center gap-1">
                                        {cvs.lastMsg?.imageUrl && (
                                            <div className="d-flex align-items-center gap-1">
                                                <span>
                                                    <FaImage style={{ color: 'rgba(22,24,35,0.7)' }} />
                                                </span>
                                                <span className="mt-1" style={{ fontSize: '0.7rem', color: 'rgba(22,24,35,0.5)' }}>
                                                    Image
                                                </span>
                                            </div>
                                        )}

                                        {cvs.lastMsg?.videoUrl && (
                                            <div className="d-flex align-items-center gap-1">
                                                <span>
                                                    <FaVideo style={{ color: 'rgba(22,24,35,0.7)' }} />
                                                </span>
                                                <span className="mt-1" style={{ fontSize: '0.7rem', color: 'rgba(22,24,35,0.5)' }}>
                                                    Video
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-1 ms-1" style={{ fontSize: '1rem', color: 'rgba(22,24,35,0.8)' }}>
                                        {cvs.lastMsg.text}
                                    </p>
                                </div>
                            </div>
                            {cvs.unseenMsg !== 0 && (
                                <p
                                    className="ms-auto d-flex justify-content-center align-items-center  p-1 bg-danger text-white rounded-circle "
                                    style={{ fontSize: '0.7rem', width: '26px', height: '26px' }}
                                >
                                    {cvs.unseenMsg}
                                </p>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/** search currentUser */}
            {openSearchUser && <SearchUser onClose={() => setOpenSearchUser(false)} />}

            {/** edit currentUser details */}
            {editUserOpen && <EditUserDetails onClose={() => setEditUserOpen(false)} user={currentUser} />}
        </div>
    );
}
