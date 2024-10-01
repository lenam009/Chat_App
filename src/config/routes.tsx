interface routes {
    [key: string]: {
        [key: string]: string;
    };
}

const routes = {
    home: {
        path: '/',
    },
    login: {
        path: '/login',
    },
    register: {
        path: '/register',
    },
    profile: {
        prefix: '/profile',
        params: ':/username',
        path: '/profile/:username',
    },

    user: {
        path: '/admin/user',
    },
    userDetail: {
        path: '/admin/user',
        dynamicPath: '/admin/user/:id',
    },
    userUpdate: {
        path: '/admin/user/update',
        dynamicPath: '/admin/user/update/:id',
    },
    userDelete: {
        path: '/admin/user/delete',
        dynamicPath: '/admin/user/delete/:id',
    },
    createUser: {
        path: '/admin/user/create',
    },

    product: {
        path: '/admin/product',
    },
    order: {
        path: '/admin/order',
    },
};

export default routes;
