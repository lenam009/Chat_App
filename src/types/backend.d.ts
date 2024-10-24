export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number;
        data?: T;
        token?: string;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: T[];
    }

    interface IUser {
        _id: string;
        name: string;
        email: string;
        profile_pic: string;
        password?: string;
        createdAt?: string;
        updatedAt?: string;
        token?: string;
    }

    interface IConversation {
        _id: string;
        sender: IUser;
        receiver: IUser;
        unseenMsg: number;
        lastMsg: IMessage;
    }

    interface IMessage {
        _id?: string;
        text: string;
        imageUrl: string;
        videoUrl: string;
        seen?: boolean;
        createdAt?: string;
        updatedAt?: string;
        msgByUserId?: string;
    }

    interface IUserSlice extends IUser {
        onlineUser: string[];
        socketConnection: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    }
}
