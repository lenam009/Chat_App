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
import MessagePage from '@/components/Message/MessagePage';
import App from '@/App';
import AuthLayout from '@/layout/auth.layout';
import ForgotPassword from '@/pages/ForgotPassword';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<App />}>
                <Route path={routes.home.path} element={<Home />}>
                    <Route path={routes.userId.path} element={<MessagePage />} />
                </Route>

                <Route
                    path={routes.register.path}
                    element={
                        <AuthLayout>
                            <RegisterPage />
                        </AuthLayout>
                    }
                />

                <Route
                    path={routes.email.path}
                    element={
                        <AuthLayout>
                            <CheckEmailPage />
                        </AuthLayout>
                    }
                />

                <Route
                    path={routes.password.path}
                    element={
                        <AuthLayout>
                            <CheckPasswordPage />
                        </AuthLayout>
                    }
                />

                <Route
                    path={routes.forgot_password.path}
                    element={
                        <AuthLayout>
                            <ForgotPassword />
                        </AuthLayout>
                    }
                />
            </Route>
        </Route>,
    ),
);

export default router;
