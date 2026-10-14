import type { LoginData } from "../schemas/signInSchema";
import type { RegisterData } from "../schemas/signUpSchema";
import { apiClient } from "./apiClient";


class AuthServices {

    async signUp(registerData: RegisterData) {
        const { data } = await apiClient.post('users/signup', registerData);
        return data;
    }

    async signIn(loginData: LoginData) {
        const { data } = await apiClient.post('users/signin', loginData);
        return data
    }

    async getUserData() {
        const { data } = await apiClient.get('users/profile-data', {

        })
        return data;
    }

}

export const authServices = new AuthServices()