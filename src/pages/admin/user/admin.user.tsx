import React from 'react';
import routes from '@/config/routes';

export default function UserPage() {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h2>Table-User</h2>
                <a
                    href={routes.createUser.path}
                    className="btn btn-primary d-flex align-items-center"
                >
                    Create a user
                </a>
            </div>
            <hr />

            <table className="table table-bordered table-hover ">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>user.id</th>
                        <td>user.email</td>
                        <td>user.fullName</td>
                        <td>
                            <a href={routes.user.path + '/' + '2'} className="btn btn-success">
                                View
                            </a>
                            <a
                                href={routes.userUpdate.path + '/' + '3'}
                                className="btn btn-warning mx-2"
                            >
                                Update
                            </a>
                            <a
                                href={routes.userDelete.path + '/' + '5'}
                                className="btn btn-danger"
                            >
                                Delete
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
