// src/lib/components/layouts/auth/loader.ts
import axiosInstance from '@lib/api/axiosInstance.ts';

import type { UserData } from '@appTypes/types';

const authLoader = async (): Promise<UserData | null> => {
    const fetchUserData = async (): Promise<UserData | null> => {

        try {
            console.log("Authloader sending get to api/verifty")
            const response = await axiosInstance.get('api/verify');
            console.log("Authloader response: ", response.data)
            return response.data.user;
        } catch (error) {
            console.error("Access token verification failed. Error: ", error);
        }
        return null;
    }

    return fetchUserData();
}

export default authLoader;