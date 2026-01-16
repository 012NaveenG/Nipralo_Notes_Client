type AuthApiResponse = {
    statusCode: number;
    message: string;
    data?: {
        user?: any;
    };
};

export { type AuthApiResponse }