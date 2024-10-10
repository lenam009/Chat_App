interface routes {
    [key: string]: {
        [key: string]: string;
    };
}

const routes = {
    home: {
        path: '/',
    },
    register: {
        path: '/register',
    },
    email: {
        path: '/email',
    },
    password: {
        path: '/password',
    },
    userId: {
        path: '/:userId',
    },
    forgot_password: {
        path: '/forgot_password',
    },
};

export default routes;
