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

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    activated: boolean;
}

interface IPost {
    id: string;
    body: string;
    user: User;
}
