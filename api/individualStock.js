import request from "@/api/initAxios";

const path = "stock"

export const getVolumnRank = () => {
    return request.get(`/${path}/volume-rank`);
}

export const getIndustryVolumn = () => {
    return request.get(`/${path}/industry-volume`);
}