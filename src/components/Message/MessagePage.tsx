import { useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { getUser } from '@/redux/userSlice';
import { HiDotsVertical } from 'react-icons/hi';
import { FaAngleLeft } from 'react-icons/fa';
import routes from '@/config/routes';

export default function MessagePage() {
    const params = useParams();
    const socketConnection = useAppSelector((state) => state?.userSlice?.socketConnection);
    const user = useAppSelector(getUser);
    const [dataUser, setDataUser] = useState({
        _id: '',
        name: '',
        email: '',
        profile_pic: '',
        online: '',
    });

    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('message-page', params.userId);

            socketConnection.on('message-user', (data) => {
                setDataUser(data);
                console.log('message-user', data);
            });
        }
    }, [socketConnection, params?.userId, user]);

    return (
        <div>
            <header
                className="position-sticky top-0 bg-white d-flex justify-content-between align-items-center px-3"
                style={{ height: 'var(--height-header)' }}
            >
                <div className="d-flex align-items-center gap-4">
                    <Link to={routes.home.path} className="">
                        <FaAngleLeft size={25} />
                    </Link>

                    <div>
                        <Avatar width="50" height="50" userId={dataUser._id} imageUrl={dataUser.profile_pic} name={dataUser.name} />
                    </div>

                    <div>
                        <h5 className="mb-0 mt-2">{dataUser.name}</h5>
                        <p>
                            {dataUser.online ? (
                                <span className="text-info">online</span>
                            ) : (
                                <span style={{ color: 'rgba(22,24,35,0.4)' }}>offline</span>
                            )}
                        </p>
                    </div>
                </div>

                <div>
                    <button className="btn btn-outline-dark" style={{ cursor: 'pointer' }}>
                        <HiDotsVertical />
                    </button>
                </div>
            </header>

            {/** Show all message */}
            <section className="" style={{ height: 'calc(100vh - var(--height-header) * 2)', overflowX: 'hidden', overflowY: 'scroll' }}>
                Show all message
            </section>

            {/** Send message */}

            <section className="bg-white" style={{ height: 'var(--height-header)' }}>
                Send message
            </section>
        </div>
    );
}
