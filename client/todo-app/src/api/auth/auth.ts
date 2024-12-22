import { apiPost } from "../apiHelper";

export const signUp = async (email: string, password: string) => {
    return apiPost("/auth/signup", { email, password });
};

export const login = async (email: string, password: string) => {
    return apiPost("/auth/login", { email, password });
};
