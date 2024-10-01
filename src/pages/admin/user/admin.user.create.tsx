import React from 'react';

export default function CreateUserPage() {
    return (
        <>
            <form>
                {/* <!-- Email --> */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                </div>
                {/* <!-- Password --> */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                {/* <!-- Phone --> */}
                <div className="mb-3">
                    <label htmlFor="exampleInputTel" className="form-label">
                        Phone number:
                    </label>
                    <input itemType="tex" className="form-control" id="exampleInputTel" />
                </div>
                {/* <!-- Full name --> */}
                <div className="mb-3">
                    <label htmlFor="exampleInputFullName" className="form-label">
                        Full name:
                    </label>
                    <input className="form-control" id="exampleInputFullName" />
                </div>
                {/* <!-- Address --> */}
                <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
                        Address:
                    </label>
                    <input className="form-control" id="exampleInputAddress" />
                </div>
                {/* Role */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Role:
                    </label>
                    <select className="form-select" aria-label="Default select example">
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>
                </div>
                {/* Avatar */}
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="fileAvatar" className="form-label">
                            Avatar:
                        </label>
                        <div className="input-group mb-3">
                            <input
                                type="file"
                                className="form-control"
                                id="fileAvatar"
                                accept=".png, .jpg, .jpeg"
                            />
                        </div>
                    </div>
                    <div className="col-2">
                        <img
                            src="data:image/jpeg;base64,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"
                            width="100%"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </>
    );
}
