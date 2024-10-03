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
};

export default routes;
