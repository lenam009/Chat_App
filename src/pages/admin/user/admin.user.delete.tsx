import React from 'react';
import { useParams } from 'react-router-dom';

interface params {
    id: string;
}
export default function UserDelete() {
    const params: params = useParams<keyof params>() as params;

    console.log('params', params.id);
    return (
        <>
            <div>
                <h1>Delete user with id : {params.id}</h1>
            </div>

            <hr />

            <div className="alert alert-danger" role="alert">
                Are you sure delete this user ?
            </div>

            <div>
                <a href="/admin/user" className="btn btn-primary">
                    Back
                </a>
                <div className="d-inline-block">
                    <form method="post" action="/admin/user/delete">
                        <button className="btn btn-danger ms-3">Confirm</button>
                    </form>
                </div>
            </div>
        </>
    );
}
