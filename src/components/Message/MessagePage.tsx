import { useAppSelector } from '@/redux/hook';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { getUser } from '@/redux/userSlice';
import { HiDotsVertical } from 'react-icons/hi';
import { FaAngleLeft, FaVideo } from 'react-icons/fa';
import { FaPlus, FaImage } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { IoMdSend } from 'react-icons/io';
import routes from '@/config/routes';
import styles from './MeesagePage.module.scss';
import uploadFile from '@/helpers/uploadFile';
import Loading from '../Loading/Loading';
import backgroundImage from '@/assets/wallapaper.jpeg';
import moment from 'moment';

export default function MessagePage() {
    const params = useParams();
    const socketConnection = useAppSelector((state) => state?.userSlice?.socketConnection);
    const user = useAppSelector(getUser);
    const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
    const [loading, setLoading] = useState(false);

    const [allMessages, setAllMessages] = useState<IMessage[]>([]);
    const currentMessageRef = useRef<HTMLInputElement | null>(null);

    const [message, setMessage] = useState({
        text: '',
        imageUrl: '',
        videoUrl: '',
    });

    const [dataUser, setDataUser] = useState({
        _id: '',
        name: '',
        email: '',
        profile_pic: '',
        online: false,
    });

    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('message-page', params.userId);

            socketConnection.emit('seen', params.userId);

            socketConnection.on('message-user', (data) => {
                setDataUser(data);
                // console.log('message-user', data);
            });

            socketConnection.on('message', (data) => {
                // console.log('message', data);
                setAllMessages(data);
            });
        }
    }, [socketConnection, params?.userId, user]);

    useEffect(() => {
        if (currentMessageRef) {
            currentMessageRef.current?.scrollIntoView({ block: 'end' });
        }
    }, [allMessages]);

    const handleUploadImageVideoOpen = () => {
        setOpenImageVideoUpload((prev) => !prev);
    };

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setLoading(true);

            const uploadImage = await uploadFile(file)
                .then((res) => res.json())
                .then((res) => {
                    console.log('res', res);
                    return res;
                })
                .catch((err) => console.log('error uploadImage', err));

            setMessage((prev) => ({ ...prev, imageUrl: uploadImage?.url }));
            setLoading(false);
            setOpenImageVideoUpload(false);
        }
    };

    const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setLoading(true);
            const uploadVideo = await uploadFile(file)
                .then((res) => res.json())
                .then((res) => {
                    console.log('res', res);
                    return res;
                })
                .catch((err) => console.log('error uploadVideo', err));

            setMessage((prev) => ({ ...prev, videoUrl: uploadVideo?.url }));
            setLoading(false);
            setOpenImageVideoUpload(false);
        }
    };

    const handleClearUploadImage = () => {
        setMessage((prev) => ({ ...prev, imageUrl: '' }));
    };

    const handleClearUploadVideo = () => {
        setMessage((prev) => ({ ...prev, videoUrl: '' }));
    };

    const handleOnChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        setMessage((prev) => ({
            ...prev,
            text,
        }));
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (message.text || message.imageUrl || message.videoUrl) {
            if (socketConnection) {
                socketConnection.emit('new message', {
                    sender: user?._id,
                    receiver: dataUser?._id,
                    text: message.text,
                    imageUrl: message.imageUrl,
                    videoUrl: message.videoUrl,
                    msgByUserId: user?._id,
                });

                setMessage({
                    text: '',
                    imageUrl: '',
                    videoUrl: '',
                });
            }
        }
    };

    return (
        <div className="" style={{ background: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
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
            <section
                className="position-relative"
                style={{
                    height: 'calc(100vh - var(--height-header) * 2)',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    backgroundColor: 'rgba(22,24,35,0.1)',
                }}
            >
                {/** All messages show here */}
                <div className="d-flex flex-column gap-2 py-2 ps-1" ref={currentMessageRef}>
                    {allMessages &&
                        allMessages.map((msg) => (
                            <div
                                className={`bg-white p-1 rounded ${user?._id === msg.msgByUserId ? 'ms-auto ' + styles['messageCurrentUser'] : ''}`}
                                style={{ width: 'fit-content', maxWidth: '28rem' }}
                            >
                                <div className="ms-auto">
                                    {msg.imageUrl && <img src={msg.imageUrl} className="w-100 rounded" style={{ objectFit: 'scale-down' }} />}
                                </div>
                                <div className="ms-auto">
                                    {msg.videoUrl && (
                                        <video
                                            src={msg.videoUrl}
                                            className="w-100 rounded"
                                            style={{ objectFit: 'scale-down' }}
                                            controls
                                            muted
                                            autoPlay
                                        />
                                    )}
                                </div>
                                <p className="px-2 ">{msg.text}</p>
                                <p className="ms-auto" style={{ width: 'fit-content', fontSize: '0.7rem' }}>
                                    {moment(msg.createdAt).format('hh:mm')}
                                </p>
                            </div>
                        ))}
                </div>

                {/** Display upload image */}
                {message.imageUrl && !loading && (
                    <div
                        className="w-100 h-100 position-sticky bottom-0 d-flex justify-content-center align-items-center rounded overflow-hidden"
                        style={{ backgroundColor: 'rgba(22,24,35,0.2)' }}
                    >
                        <div onClick={handleClearUploadImage} className="p-1 position-absolute btn btn-danger" style={{ top: 0, right: 0 }}>
                            <IoClose size={30} />
                        </div>

                        <div className="bg-white p-3">
                            <img
                                src={message.imageUrl}
                                className="w-100 h-100 m-2 "
                                style={{ maxWidth: '24rem', objectFit: 'scale-down' }}
                                alt="uploadImage"
                            />
                        </div>
                    </div>
                )}

                {/** Display upload video */}
                {message.videoUrl && !loading && (
                    <div
                        className="w-100 h-100 position-sticky bottom-0 d-flex justify-content-center align-items-center rounded overflow-hidden"
                        style={{ backgroundColor: 'rgba(22,24,35,0.2)' }}
                    >
                        <div onClick={handleClearUploadVideo} className="p-1 position-absolute btn btn-danger" style={{ top: 0, right: 0 }}>
                            <IoClose size={30} />
                        </div>

                        <div className="bg-white p-3">
                            <video
                                src={message.videoUrl}
                                className="w-100 h-100 m-2 "
                                style={{ maxWidth: '24rem', objectFit: 'scale-down' }}
                                controls
                                muted
                                autoPlay
                            />
                        </div>
                    </div>
                )}

                {/** Loading display */}
                {loading && (
                    <div className="w-100 h-100 position-sticky bottom-0  d-flex justify-content-center align-items-center">
                        <Loading />
                    </div>
                )}
            </section>

            {/** Send message */}
            <section className="bg-white d-flex align-items-center px-3" style={{ height: 'var(--height-header)' }}>
                <div className="position-relative d-flex align-items-center" style={{ width: '64px', height: '52px' }}>
                    <button onClick={handleUploadImageVideoOpen} className="rounded-circle d-flex align-items-center btn btn-outline-info">
                        <FaPlus size={20} />
                    </button>

                    {/** Video and image */}
                    {openImageVideoUpload && (
                        <div className="bg-white shadow-sm rounded position-absolute  p-2" style={{ width: '9rem', bottom: 52 }}>
                            <form>
                                <label htmlFor="uploadImage" className={`d-flex align-items-center p-2 gap-2 ${styles['labelUpload']}`}>
                                    <div className="text-primary">
                                        <FaImage size={16} />
                                    </div>
                                    <p>Image</p>
                                </label>

                                <label htmlFor="uploadVideo" className={`d-flex align-items-center p-2 gap-2 ${styles['labelUpload']}`}>
                                    <div className="" style={{ color: 'rgb(168,85,247)' }}>
                                        <FaVideo size={16} />
                                    </div>
                                    <p>Video</p>
                                </label>

                                <input type="file" id="uploadImage" onChange={handleUploadImage} className="visually-hidden" />
                                <input type="file" id="uploadVideo" onChange={handleUploadVideo} className="visually-hidden" />
                            </form>
                        </div>
                    )}
                </div>

                {/**input box */}
                <form className="w-100 h-100 d-flex gap-2" onSubmit={handleSendMessage}>
                    <input
                        className="py-1 px-4 w-100 h-100"
                        type="text"
                        placeholder={`Your message to ${dataUser.name}...`}
                        value={message.text}
                        onChange={handleOnChangeMessage}
                    />
                    <button type="submit" className={` ${styles['btnSend']}`} style={{ backgroundColor: 'unset' }}>
                        <IoMdSend size={25} />
                    </button>
                </form>
            </section>
        </div>
    );
}
