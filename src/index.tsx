import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'components/GlobalStyle/GlobalStyle.module.scss';
import '@/assets/css/styles.css';
import store from './redux/store';
import { persistor } from './redux/store';

import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import Layout from './layout/layout';
import ProductPage from './pages/admin/product/admin.product';
import UserPage from './pages/admin/user/admin.user';
import OrderPage from './pages/admin/order/admin.order';
import CreateUserPage from './pages/admin/user/admin.user.create';
import UserDetail from './pages/admin/user/admin.user.detail';
import UserUpdate from './pages/admin/user/admin.user.update';
import UserDelete from './pages/admin/user/admin.user.delete';

import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    redirect,
    Navigate,
} from 'react-router-dom';
import routes from './config/routes';
import { defer } from 'react-router-dom';

const number: Number = 1;

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={number === 1 ? <Navigate to={routes.home.path} /> : null}>
                <Route path={routes.login.path} element={<LoginPage />} />
                <Route path={routes.register.path} element={<RegisterPage />} />
            </Route>

            <Route element={<Layout />}>
                <Route element={number === 1 ? null : <Navigate to={routes.login.path} />}>
                    <Route
                        path={routes.home.path}
                        element={<HomePage />}
                        // path={'/:slug'}
                        // loader={async ({}) => {
                        //     // loaders can be async functions
                        //     const res = fetch('http://localhost:8088/api/user/getall').then(
                        //         (res) => res.json(),
                        //     );
                        //     try {
                        //         // const user = res.json();
                        //         return defer({ res });
                        //     } catch (error) {
                        //         throw redirect(routes.login);
                        //     }
                        // }}
                    />

                    <Route>
                        <Route path={routes.user.path} element={<UserPage />} />
                        <Route path={routes.userDetail.dynamicPath} element={<UserDetail />} />
                        <Route path={routes.userUpdate.dynamicPath} element={<UserUpdate />} />
                        <Route path={routes.userDelete.dynamicPath} element={<UserDelete />} />
                        <Route path={routes.createUser.path} element={<CreateUserPage />} />
                        <Route path={routes.product.path} element={<ProductPage />} />
                        <Route path={routes.order.path} element={<OrderPage />} />
                    </Route>
                </Route>
            </Route>
        </Route>,
    ),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* <App /> */}
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>,
);
