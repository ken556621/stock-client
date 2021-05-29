import request from "@/api/initAxios";


export const getVolumnRank = () => {
    return request.get(`/stock/volume-rank`);
}