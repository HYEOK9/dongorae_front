import { AxiosError } from "axios";
import axios from "./axios";

export const boundarySearch = async (
    en_latitude: number = 128.46,
    en_longitude: number = 38.66,
    ws_latitude: number = 126.12,
    ws_longitude: number = 33.16,
    doSenseFilter: boolean = false,
    userId: number | undefined = undefined
) => {
    try {
        const res = await axios.post(
            "/api/feed/search",
            {
                doSenseFilter,
                userId,
                en_latitude,
                en_longitude,
                ws_latitude,
                ws_longitude,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        if (200 <= res.status && res.status < 300) return res.data;
        else throw new Error();
    } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        return null;
    }
};

export const keywordSearch = async (
    searchKeyWord: string,
    doSenseFilter: boolean = false,
    userId: number | undefined = undefined,
    en_latitude: number = 128.46,
    en_longitude: number = 38.66,
    ws_latitude: number = 126.12,
    ws_longitude: number = 33.16
) => {
    try {
        const res = await axios.post(
            "/api/feed/search",
            {
                searchKeyWord,
                doSenseFilter,
                userId,
                en_latitude,
                en_longitude,
                ws_latitude,
                ws_longitude,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        if (200 <= res.status && res.status < 300) return res.data;
        else throw new Error();
    } catch (e) {
        const error = e as AxiosError;
        console.log(error);
        return null;
    }
};
