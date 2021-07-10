import request from "@/api/initAxios";

const path = "economic"


export const getTwIndex = () => {
    return request.get(`/${path}/tw-index`);
}