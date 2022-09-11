import axios from "axios";
import { AxiosError } from "axios";

export const logIn = async (email: string, password: string) => {
    try {
        const res = await axios.post(
            "/api/user/auth/access",
            { email, password },
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        const { accessToken } = res?.data;
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken}`;
        return res.data;
    } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        return null;
    }
};

export const signUp = async (
    email: string,
    password: string,
    username: string,
    nickname: string,
    city: string,
    county: string,
    type: string,
    sense_auditory: number,
    sense_oral: number,
    sense_proprioceptive: number,
    sense_tactile: number,
    sense_vestibular: number,
    sense_visual: number
) => {
    try {
        const res = await axios.post(
            "/api/user",
            {
                email,
                password,
                username,
                nickname,
                city,
                county,
                type,
                sense_auditory,
                sense_oral,
                sense_proprioceptive,
                sense_tactile,
                sense_vestibular,
                sense_visual,
            },
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (200 <= res.status && res.status < 300) {
            return res.data;
        } else throw new Error();
    } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        return null;
    }
};
