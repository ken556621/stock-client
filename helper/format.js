import {
    industrySchema
} from "@/helper/stockSchema";

export const industryToPostId = (industry) => {
    let postId = "";

    industrySchema.forEach((item, index) => {
        if (industry.includes(item)) {
            postId = item.value
        }
    })

    return postId
};

// 回傳兩個陣列，分為前 1/3 與 後 2/3
export const splitData = (data, dataKey) => {
    if (!data.length) return
    const sum = data.reduce((a, b) => {
        return {
            [dataKey]: a[dataKey] + b[dataKey]
        };
    })[dataKey];

    const average = sum / (data.length);

    const higherData = data.filter(item => item[dataKey] > (average * 4 / 3));
    const lowerData = data.filter(item => item[dataKey] < (average * 4 / 3));

    return [higherData, lowerData];
};