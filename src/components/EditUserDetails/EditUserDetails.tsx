import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import uploadFile from '@/helpers/uploadFile';
import Divider from '../Divider/Divider';
import axiosCreate from '@/api';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/userSlice';

interface IProps {
    onClose: () => void;
    user: IUser;
}

const EditUserDetails = ({ onClose, user }: IProps) => {
    const [data, setData] = useState({
        name: user?.name,
        profile_pic: user?.profile_pic,
    });

    const [isUploadPhoto, setIsUploadPhoto] = useState(false);
    const dispatch = useAppDispatch();

    const uploadPhotoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setData((prev) => ({ ...prev, ...user }));
    }, [user]);

    console.log('EditUserDetails_user', user);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenUploadPhoto = (e: React.MouseEvent<HTMLElement>) => {
        uploadPhotoRef.current?.click();
    };

    const handleShowUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setData((prev) => ({ ...prev, profile_pic: URL.createObjectURL(file) }));
        }

        // if (file) {
        //     setIsUploadPhoto(true);

        //     const uploadPhoto = await uploadFile(file)
        //         .then((res) => res.json())
        //         .then((res) => {
        //             console.log('res', res);
        //             return res;
        //         })
        //         .catch((err) => console.log('error uploadPhoto', err));

        //     setIsUploadPhoto(false);

        //     setData((prev) => ({ ...prev, profile_pic: uploadPhoto.url }));
        // }
    };

    const handleGetUrlUploadPhoto = async () => {
        const file = uploadPhotoRef.current?.files && uploadPhotoRef.current?.files[0];
        if (file) {
            const uploadPhoto = await uploadFile(file)
                .then((res) => res.json())
                .then((res) => {
                    console.log('res', res);
                    return res;
                })
                .catch((err) => console.log('error uploadPhoto', err));

            setData((prev) => {
                return { ...prev, profile_pic: uploadPhoto.url };
            });

            return uploadPhoto.url;
        }
    };

    // console.log('data-1', data);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user/update-user`;

        setIsUploadPhoto(true);

        const UrlUploadPhoto = await handleGetUrlUploadPhoto();

        // console.log('data-2', data);

        const response = (await axiosCreate
            .put(URL, { ...data, profile_pic: UrlUploadPhoto })
            .then((res) => {
                // Upload Photo

                //@ts-ignore
                toast.success(res.message);

                //@ts-ignore
                console.log('res.message', res.message);

                // setData({
                //     name: '',
                //     profile_pic: '',
                // });

                return res;
            })
            .catch((err) => null)) as IBackendRes<IUser> | null;

        setIsUploadPhoto(false);

        // Refresh page to refresh profile_pic
        if (response?.data) {
            dispatch(setUser(response.data));
            onClose();
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(22,24,35,0.4)' }}
        >
            <div className="bg-white p-4 m-1 my-5 rounded w-25">
                <h5>Profile Details</h5>
                <p className="">Edit user details</p>

                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="">
                            Name:
                        </label>
                        <div className="my-1">
                            <input type="name" className="form-control" id="name" name="name" value={data.name} onChange={handleOnChange} />
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="profile_pic">Photo:</label>
                        <div className="my-1 d-flex align-items-center gap-4">
                            <Avatar width="40" height="40" name={data?.name} imageUrl={data?.profile_pic} />
                            <button type="button" className="btn btn-outline-white" onClick={handleOpenUploadPhoto}>
                                Change photo
                            </button>
                            <input ref={uploadPhotoRef} type="file" id="profile_pic" style={{ display: 'none' }} onChange={handleShowUploadPhoto} />
                        </div>
                    </div>

                    <Divider />

                    <div className="d-flex gap-2 justify-content-end mt-3 ">
                        <button onClick={onClose} className="btn btn-outline-danger">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isUploadPhoto}>
                            {isUploadPhoto ? (
                                <div className="spinner-border text-light spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(EditUserDetails);
