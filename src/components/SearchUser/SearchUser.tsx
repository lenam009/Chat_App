import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import Loading from '../Loading/Loading';
import UserSearchCard from '../UserSearchCard/UserSearchCard';
import axiosCreate from '@/api';

interface IProps {
    onClose: () => void;
}

const SearchUser = ({ onClose }: IProps) => {
    const [searchUser, setSearchUser] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const handleSearchUser = async () => {
        const URL = `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/user/search-users`;

        const response = (await axiosCreate
            .post(URL, { search })
            .then((res) => {
                //@ts-ignore
                setSearchUser(res.data);
            })
            .catch((err) => null)) as IBackendRes<IUser> | null;
    };

    useEffect(() => {
        handleSearchUser();
    }, [search]);

    console.log('searchUser', searchUser);

    return (
        <div className="position-fixed fixed-top fixed-bottom p-2" style={{ backgroundColor: 'rgba(22,24,35,0.3)' }}>
            <div className="mx-auto mt-5" style={{ maxWidth: '40%' }}>
                {/** Input Search User */}
                <div className="bg-white rounded overflow-hidden d-flex" style={{ height: '48px' }}>
                    <input
                        className="w-100 h-100 py-1 px-3"
                        type="text"
                        placeholder="Search user by name, email..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <div className="d-flex align-items-center " style={{ height: '48px', width: '32px' }}>
                        <IoSearchOutline size={25} />
                    </div>
                </div>

                {/**Display search user */}
                <div className="bg-white mt-2 w-100 p-3 rounded  overflow-scroll" style={{ maxHeight: '75vh' }}>
                    {/**No user found */}
                    {searchUser.length === 0 && !loading && (
                        <p className="text-center mb-0" style={{ color: 'rgba(22,24,35,0.7)' }}>
                            No user found!
                        </p>
                    )}

                    {loading && (
                        <p className="mb-0">
                            <Loading />
                        </p>
                    )}

                    {searchUser.length !== 0 &&
                        !loading &&
                        searchUser.map((user, index) => <UserSearchCard key={user._id} user={user} onClose={onClose} />)}
                </div>
            </div>
        </div>
    );
};

export default SearchUser;
