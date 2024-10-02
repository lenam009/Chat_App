import routes from '@/config/routes';
import Layout from '@/layout/layout';
import Home from '@/pages/Home';
import CheckEmailPage from '@/pages/CheckEmailPage';
import CheckPasswordPage from '@/pages/CheckPasswordPage';
import RegisterPage from '@/pages/RegisterPage';
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    redirect,
    Navigate,
} from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Layout />}>
                <Route path={routes.home.path} element={<Home />} />
                <Route path={routes.register.path} element={<RegisterPage />} />
                <Route path={routes.email.path} element={<CheckEmailPage />} />
                <Route path={routes.password.path} element={<CheckPasswordPage />} />
            </Route>
        </Route>,
    ),
);

export default router;
