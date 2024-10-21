import React from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './UserSearchCard.module.scss';
import { Link } from 'react-router-dom';
import routes from '@/config/routes';

interface IProps {
    user: IUser;
    onClose: () => void;
}

const UserSearchCard = ({ user, onClose }: IProps) => {
    return (
        <Link
            to={routes.userId.pathOrigin + user._id}
            onClick={onClose}
            className={`d-flex align-items-center gap-4 p-2 p-lg-3 border ${styles['borderCard']} rounded `}
        >
            <div>
                <Avatar width="50" height="50" name={user.name} imageUrl={user.profile_pic} />
            </div>
            <div>
                <div className="fw-bold">{user.name}</div>
                <p className="mb-0"> {user.email}</p>
            </div>
        </Link>
    );
};

export default UserSearchCard;
