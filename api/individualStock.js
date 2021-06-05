import request from "@/api/initAxios";

const path = "stock"

export const getVolumnRank = () => {
    return request.get(`/${path}/volume-rank`);
}

export const getAllIndustryList = ({ body }) => {
    return request.post(`/${path}/industry-list`, body);
}

export const getIndustryVolumn = () => {
    return request.get(`/${path}/industry-volume`);
}

export const getCompanyDetail = ({ body }) => {
    return request.post(`/${path}/company-detail`, body);
}

export const getYearlyPriceVolumn = ({ body }) => {
    return request.post(`/${path}/price-volumn-year`, body);
}

export const getAllGrossMargin = () => {
    return request.get(`/${path}/all-gross-margin`);
}