import axios, { AxiosError } from "axios";
import type { LoginForm, RegisterForm } from "../types/user.types";
import type { AuthApiResponse } from "../types/api.types";
import { SERVER_URL } from "../config/server.ts";
const loginUser = async (form: LoginForm): Promise<AuthApiResponse> => {
    try {
        const response = await axios.post<AuthApiResponse>(
            `${SERVER_URL}/api/v1/users/login`,
            form,
            {
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError<any>;
        throw new Error(err.response?.data?.message || "Login failed");
    }
};


const registerUser = async (form: RegisterForm): Promise<AuthApiResponse> => {
    try {

        const response = await axios.post<AuthApiResponse>(
            `${SERVER_URL}/api/v1/users/register`,
            form
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError<any>;
        throw new Error(err.response?.data?.message || "Register failed");
    }
}


const logoutUser = async (): Promise<string> => {
    const res = await axios.get(`${SERVER_URL}/api/v1/users/logout`)
    return res.data?.message
}
export { loginUser, registerUser, logoutUser };
