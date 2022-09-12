import axios, { AxiosError } from "axios";

export const logIn = async (email: string, password: string) => {
    try {
        const res = await axios.post(
            "/api/user/auth/access",
            { email, password },
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (res.data.isSuccess) {
            const { access_token } = res?.data;
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;
            return res.data;
        } else {
            alert(res.data.detail);
            throw new Error();
        }
    } catch (e) {
        console.log(e);
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
        if (res.data.isSuccess) return res.data;
        else {
            alert(res.data.detail);
            throw new Error();
        }
    } catch (e) {
        console.log(e);
    }
};
