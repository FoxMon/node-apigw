import axios, { HttpStatusCode, isAxiosError } from 'axios';

export const axiosInstance = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        if (isAxiosError(error) && error.response) {
            switch (error.response.status) {
                case HttpStatusCode.BadRequest:
                    console.error(`Bad request::${error.config?.data}`);
                    break;
            }
        } else {
            throw error;
        }
    },
);
