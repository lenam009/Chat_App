import React from 'react';
import { useParams } from 'react-router-dom';
interface params {
    id: string;
}

export default function UserUpdate() {
    const params: params = useParams<keyof params>() as params;

    console.log('params', params.id);

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

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </>
    );
}
