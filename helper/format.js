export const industrySchema = [
    "水泥",
    "食品",
    "塑膠",
    "紡織",
    "電機",
    "電器",
    "化生",
    "化學",
    "生技",
    "玻璃",
    "紙",
    "鋼鐵",
    "橡膠",
    "汽車",
    "電子",
    "半導",
    "電腦",
    "光電",
    "通信",
    "電零",
    "通路",
    "資服",
    "他電",
    "營建",
    "航運",
    "觀光",
    "金融",
    "貿易",
    "油電",
    "其他"
];

export const industryToPostId = (industry) => {
    let postId = "";

    industrySchema.forEach((item, index) => {
        if (industry.includes(item)) {
            postId = index
        }
    })

    return postId
};