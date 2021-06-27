import request from "@/api/initAxios";

const path = "stock"


export const getStockName = ({ body }) => {
    return request.post(`/${path}/name`, body);
}

export const getVolumnRank = () => {
    return request.get(`/${path}/volume-rank`);
}

export const getAllIndustryList = ({ body }) => {
    return request.post(`/${path}/industry-list`, body);
}

export const getIndustryVolumn = () => {
    return request.get(`/${path}/industry-volume`, { disabledAbort: true });
}

export const getCompanyDetail = ({ body }) => {
    return request.post(`/${path}/company-detail`, body);
}

export const getAllGrossMargin = () => {
    return request.get(`/${path}/all-gross-margin`);
}

export const getAllPriceEarnRatio = () => {
    return request.get(`/${path}/all-price-earn-ratio`);
}

export const getIndividualStockNews = ({ body }) => {
    return request.post(`/${path}/individual-news`, body);
}

export const getYearlyPriceVolumn = ({ body }) => {
    return request.post(`/${path}/price-volumn-multi-year`, body);
}

export const getMonthlyPriceVolumn = ({ body }) => {
    return request.post(`/${path}/price-volumn-year`, body);
}

export const getDailyPriceVolumn = ({ body }) => {
    return request.post(`/${path}/price-volumn-day`, body);
}