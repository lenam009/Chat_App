import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

interface params {
    id: string;
}
export default function UserDetail() {
    const params: params = useParams<keyof params>() as params;

    console.log('params', params.id);

    return (
        <>
            <div className="d-flex justify-content-between">
                <h2>User Detail with id: {params.id}</h2>
            </div>
            <hr />

            <div className="card" style={{ width: '60%' }}>
                <div className="card-header">User information</div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">ID: user.id</li>
                    <li className="list-group-item">Email: user.email</li>
                    <li className="list-group-item">FullName: user.fullName</li>
                    <li className="list-group-item">Address: user.address</li>
                </ul>
            </div>
        </>
    );
}
