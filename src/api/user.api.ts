import axios, { AxiosError } from "axios";
import type { LoginForm, RegisterForm } from "../types/user.types";
import type { AuthApiResponse } from "../types/api.types";
const loginUser = async (form: LoginForm): Promise<AuthApiResponse> => {
    try {
        const response = await axios.post<AuthApiResponse>(
            "/api/v1/users/login",
            form
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
            "/api/v1/users/register",
            form
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError<any>;
        throw new Error(err.response?.data?.message || "Register failed");
    }
}

export { loginUser, registerUser };
