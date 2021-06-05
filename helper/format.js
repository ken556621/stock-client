import {
    industrySchema
} from "@/helper/stockSchema";

export const industryToPostId = (industry) => {
    let postId = "";

    industrySchema.forEach((item, index) => {
        if (industry.includes(item)) {
            postId = index
        }
    })

    return postId
};