declare module 'vue-infinite-scroll';

interface FormDefinition {
    valid: boolean;
    fields: {
        [key: string]: any;
    };
    rules?: {
        [key: string]: any;
    };
}

type TUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    activated: boolean;
}

type TPost = {
    id: string;
    body: string;
    user: TUser;
    comments?: TComment[];
}

type TComment = {
    id: string;
    body: string;
    created_at: string;
    user: TUser;
}
