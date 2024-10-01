import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './header';
import SideBar from './sidebar';

export default function Layout() {
    return (
        <>
            <Header />
            <div id="layoutSidenav">
                <SideBar />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <div className="mt-5"></div>

                            {/* <!-- Content --> */}
                            <div className="row">
                                <div className="col-md-6 col-lg-10 mx-md-auto">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
