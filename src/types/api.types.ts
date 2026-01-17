type AuthUser = {
    id: number;
    name: string;
};

type AuthApiResponse = {
    statusCode: number;
    message: string;
    data: AuthUser; // NOT optional
};


export { type AuthApiResponse }