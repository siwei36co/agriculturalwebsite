// 广西农业产业数据平台（前端展示用）
// 数据来源：广西农业数据汇总报告 2020-2025
// 说明：关键指标以公开渠道可核验数据为准

// ============================================================
// 一、农业经济总览（2020-2025）
// ============================================================
const agriOverviewData = [
  { year: 2020, primaryGVA: 3555.82, growthRate: 5.0, gdpShare: 16.0, grainOutput: 1370.0, ruralIncome: 14815, mechRate: 65.54 },
  { year: 2021, primaryGVA: 4015.51, growthRate: 8.2, gdpShare: 16.2, grainOutput: 1386.5, ruralIncome: 16363, mechRate: 66.6 },
  { year: 2022, primaryGVA: 4269.81, growthRate: 5.0, gdpShare: 16.2, grainOutput: 1393.1, ruralIncome: 17433, mechRate: 67.6 },
  { year: 2023, primaryGVA: 4468.18, growthRate: 4.7, gdpShare: 16.4, grainOutput: 1395.4, ruralIncome: 18656, mechRate: 69.8 },
  { year: 2024, primaryGVA: 4751.54, growthRate: 4.3, gdpShare: 16.5, grainOutput: 1403.8, ruralIncome: 19954, mechRate: 69.81 },
  { year: 2025, primaryGVA: 4631.71, growthRate: 4.2, gdpShare: 15.6, grainOutput: 1404.4, ruralIncome: 21149, mechRate: null }
];

// ============================================================
// 二、粮食生产（2020-2025）
// ============================================================
const grainData = [
  { year: 2020, total: 1370.0, rice: 1013.8, corn: 273.3, growthRate: 2.9, sowingArea: 2806.0 },
  { year: 2021, total: 1386.5, rice: 1017.9, corn: 285.2, growthRate: 1.2, sowingArea: 2822.9 },
  { year: 2022, total: 1393.1, rice: 1028.1, corn: 280.4, growthRate: 0.5, sowingArea: 2829.3 },
  { year: 2023, total: 1395.36, rice: 1030.35, corn: 278.18, growthRate: 0.2, sowingArea: 2834.7 },
  { year: 2024, total: 1403.8, rice: 1035.0, corn: 280.3, growthRate: 0.6, sowingArea: 2841.8 },
  { year: 2025, total: 1404.4, rice: null, corn: null, growthRate: 0.04, sowingArea: 2846.9 }
];

// ============================================================
// 三、糖料蔗产业
// ============================================================
const yearlyProductionData = [
  { season: "2019/20", sugarOutput: 600.00, caneInput: 4579.00, sugarRate: 13.11, plantingArea: 1126 },
  { season: "2020/21", sugarOutput: 628.79, caneInput: 4921.00, sugarRate: 12.78, plantingArea: 1115 },
  { season: "2021/22", sugarOutput: 611.94, caneInput: 5019.41, sugarRate: 12.19, plantingArea: 1106 },
  { season: "2022/23", sugarOutput: 527.03, caneInput: 4122.13, sugarRate: 12.79, plantingArea: 1087 },
  { season: "2023/24", sugarOutput: 618.14, caneInput: 5118.00, sugarRate: 12.08, plantingArea: 1124 },
  { season: "2024/25", sugarOutput: 646.50, caneInput: 4859.54, sugarRate: 13.30, plantingArea: 1135 }
];

const sugarKeyIndicators = {
  consecutiveFirst: 34,
  nationalShare: 57.9,
  varietyCoverage: 99,
  selfBreedCoverage: 92,
  farmerIncome: 286.85,
  mechRate: 72.12,
  harvesterCount: 3077,
  sugarGroups: 10,
  sugarMills: 73,
  industrialValueTarget2025: 720,
  industrialValueTarget2026: 760,
  industrialValueTarget2027: 810,
  bagasseUtilization: 100,
  molassesUtilization: 100,
  filterCakeUtilization: 100,
  leafUtilization2025: 40,
  byproductTypes: 30,
  laibinChainValue2025: 160,
  laibinByproductValue: 70,
  laibinBagasseCapacity: 18
};

const sugarPriceData = [
  { season: "2019/20", avgPrice: 5724, range: "5400-6000", trend: "疫情冲击，相对稳定" },
  { season: "2020/21", avgPrice: 5297, range: "5250-5590", trend: "低位运行，同比下降402元" },
  { season: "2021/22", avgPrice: 5752, range: "5440-6167", trend: "先高后低，榨季末回落" },
  { season: "2022/23", avgPrice: 6346, range: "5600-7100+", trend: "全球减产，后期强势上涨" },
  { season: "2023/24", avgPrice: 6588.35, range: "6490-7720", trend: "高位运行后回落" },
  { season: "2024/25", avgPrice: 6011, range: "5800-6400", trend: "价格重心下移" }
];

// 糖市实时报价（保留原有）
const gxSugarMarketBrief = {
  season: "2025/26",
  seasonStart: "2025-11-15",
  prices: [
    { date: "2025-11-24", low: 5430, high: 5450, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/11/35734.html" },
    { date: "2025-11-25", low: 5430, high: 5470, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/11/35744.html" },
    { date: "2025-11-26", low: 5420, high: 5480, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/11/35747.html" },
    { date: "2025-11-27", low: 5430, high: 5480, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/11/35755.html" },
    { date: "2025-12-01", low: 5400, high: 5470, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/12/35770.html" },
    { date: "2025-12-02", low: 5400, high: 5480, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/12/35781.html" },
    { date: "2025-12-04", low: 5350, high: 5400, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/12/35801.html" },
    { date: "2025-12-08", low: 5330, high: 5400, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/12/35833.html" },
    { date: "2025-12-10", low: 5300, high: 5380, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/12/35846.html" },
    { date: "2025-12-11", low: 5280, high: 5380, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/12/35859.html" },
    { date: "2025-12-15", low: 5280, high: 5380, sourceName: "新浪财经", sourceUrl: "https://finance.sina.com.cn/money/future/agri/2025-12-15/doc-inhawaui2435483.shtml" },
    { date: "2025-12-16", low: 5230, high: 5340, sourceName: "生意社", sourceUrl: "https://www.100ppi.com/news/detail-20251216-5077103.html" },
    { date: "2025-12-17", low: 5220, high: 5310, sourceName: "新浪财经", sourceUrl: "https://finance.sina.com.cn/money/future/agri/2025-12-17/doc-inhcaqyr7348849.shtml" },
    { date: "2025-12-31", low: 5270, high: 5350, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2025/12/36683.html" },
    { date: "2026-01-12", low: 5310, high: 5380, sourceName: "泛糖科技", sourceUrl: "https://www.hisugar.com/home/articleContent?id=2026011308512474726497" },
    { date: "2026-01-23", low: 5220, high: 5330, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/01/36939.html" },
    { date: "2026-01-27", low: 5250, high: 5320, sourceName: "泛糖科技", sourceUrl: "https://www.hisugar.com/home/articleContent?id=2026012808510247368879" },
    { date: "2026-02-02", low: 5270, high: 5320, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/02/37006.html" },
    { date: "2026-02-24", low: 5280, high: 5340, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/02/37149.html" },
    { date: "2026-02-27", low: 5310, high: 5350, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/02/37171.html" },
    { date: "2026-03-02", low: 5320, high: 5350, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/03/37187.html" },
    { date: "2026-03-03", low: 5310, high: 5350, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/03/37202.html" },
    { date: "2026-03-04", low: 5310, high: 5350, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/03/37212.html" },
    { date: "2026-03-05", low: 5320, high: 5360, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/03/37226.html" },
    { date: "2026-03-06", low: 5350, high: 5400, sourceName: "云糖网", sourceUrl: "https://www.yntw.com/2026/03/37234.html" }
  ]
};

// ============================================================
// 四、水果产业（2020-2025）
// ============================================================
const fruitData = [
  { year: 2020, total: 2461.1 },
  { year: 2021, total: 3121.1 },
  { year: 2022, total: 3080.1 },
  { year: 2023, total: 3232.6 },
  { year: 2024, total: 3394.0 },
  { year: 2025, total: 3533, isEstimate: true, note: '按2024年3394.0万吨和2025年同比增长4.1%推算' }
];

const fruitKeyIndicators = {
  consecutiveFirst: 8,
  plantingArea: 2100,
  chainValue: 2000,
  nationalShare: "约1/7",
  poorCountyArea: 890,
  poorCountyOutput: 1183,
  poorCountyCount: 38,
  farmersSupported: 70,
  exportTotal2023: 128.38,
  exportValue2023: 29.83,
  mangoChainValue: 200,
  topVarieties: [
    { name: "柑橘", output: "1996.26万吨(2024)", rank: "全国第一(29.39%)" },
    { name: "柿子", output: "恭城县105万吨(2025)", rank: "全国第一" },
    { name: "火龙果", output: "约78万吨(2024)", rank: "全国第一" },
    { name: "百香果", output: "50.24万吨(2024)", rank: "全国第一" },
    { name: "芒果", output: "约125万吨(2024)", rank: "全国第二" },
    { name: "香蕉", output: "316.29万吨(2024)", rank: "全国第二(26.9%)" },
    { name: "荔枝", output: "41.61万吨(2024)", rank: "全国第二(约31%)" },
    { name: "龙眼", output: "约69万吨(2023)", rank: "全国第二" }
  ]
};

// ============================================================
// 五、畜牧业（2020-2025）
// ============================================================
const livestockData = [
  { year: 2020, meatTotal: 371.30, pork: 174.10, poultry: 179.90, beef: 13.60, mutton: 3.60, pigOut: 2281.20, pigStock: 1828.30 },
  { year: 2021, meatTotal: 432.44, pork: 245.24, poultry: 169.15, beef: 14.03, mutton: 4.02, pigOut: 3113.89, pigStock: 2128.19 },
  { year: 2022, meatTotal: 445.98, pork: 262.65, poultry: 164.08, beef: 14.94, mutton: 4.31, pigOut: 3347.44, pigStock: 2219.70 },
  { year: 2023, meatTotal: 469.15, pork: 276.05, poultry: 173.50, beef: 15.25, mutton: 4.35, pigOut: 3516.60, pigStock: 2268.54 },
  { year: 2024, meatTotal: 472.49, pork: 287.36, poultry: 166.91, beef: 14.08, mutton: 4.14, pigOut: 3651.35, pigStock: 2434.14 },
  { year: 2025, meatTotal: 500.37, pork: 321.00, poultry: null, beef: null, mutton: null, pigOut: 4005.53, pigStock: 2774.92 }
];

// ============================================================
// 六、渔业（2020-2024）
// ============================================================
const fisheryData = [
  { year: 2020, total: 343.96, seawater: 199.07, growthRate: 1.1 },
  { year: 2021, total: 352.94, seawater: 206.66, growthRate: 2.6 },
  { year: 2022, total: 363.77, seawater: 213.29, growthRate: 3.1 },
  { year: 2023, total: 376.99, seawater: 220.98, growthRate: 3.6 },
  { year: 2024, total: 387.02, seawater: 226.77, growthRate: 2.7 }
];

const fisheryKeyIndicators = {
  nationalRank: "第八(西部第一)",
  economicValue2024: 1276.53,
  circularPools: 33000,
  fishermanIncome2023: 22899,
  topProducts: [
    { name: "近江牡蛎", output: "71.55万吨(2023)", rank: "全国第一" },
    { name: "南美白对虾", output: "32.79万吨(2023)", rank: "全国第二" },
    { name: "金鲳鱼", output: "8.8万吨(2023)", rank: "全国第二" },
    { name: "罗非鱼", output: "约26万吨(2023)", rank: "全国第三" }
  ]
};

// ============================================================
// 七、林业（2020-2025）
// ============================================================
const forestryData = [
  { year: 2020, timberOutput: 3600.00, growthRate: 2.9 },
  { year: 2021, timberOutput: 4702.00, growthRate: 11.9 },
  { year: 2022, timberOutput: 4864.97, growthRate: 3.5 },
  { year: 2023, timberOutput: 5220.70, growthRate: 7.3 },
  { year: 2024, timberOutput: 5923.08, growthRate: 13.5 },
  { year: 2025, timberOutput: 6693, growthRate: 13.0 }
];

const forestryKeyIndicators = {
  totalValue2023: 9569,
  totalValue2024: 10500,
  totalValue2025: 11600,
  totalValueTarget2025: 13000,
  boardOutput2024: 7050,
  boardNationalShare: 33.1,
  forestCoverage: 60.2,
  woodProcessingValue2024: 2387,
  woodProcessingTarget2025: 4900,
  furnitureTarget2025: 6000,
  enterprises2024: 2700,
  woodHangerExport: "全国第一"
};

// ============================================================
// 八、蚕桑产业（2020-2024）
// ============================================================
const silkwormData = [
  { year: 2020, cocoonOutput: 37.40, nationalShare: 52.3 },
  { year: 2021, cocoonOutput: 40.74, nationalShare: 57 },
  { year: 2022, cocoonOutput: 43.71, nationalShare: 59 },
  { year: 2023, cocoonOutput: 46.14, nationalShare: 61.38 },
  { year: 2024, cocoonOutput: 48.47, nationalShare: 62.69 }
];

const silkwormKeyIndicators = {
  cocoonFirstYears: 20,
  silkFirstYears: 15,
  silkOutput2024: 1.892,
  silkNationalShare: 46.42,
  industryValue: 130,
  farmerIncome2024: 270,
  xiangYunShaShare: 70,
  consecutiveOver200: 4,
  poorCounties: 45,
  totalPoorCounties: 54
};

// ============================================================
// 九、蔬菜产量（2020-2025）
// ============================================================
const vegetableData = [
  { year: 2020, total: 3830.77, growthRate: 5.4 },
  { year: 2021, total: 4047.46, growthRate: 5.7 },
  { year: 2022, total: 4236.52, growthRate: 4.7 },
  { year: 2023, total: 4425.03, growthRate: 4.4 },
  { year: 2024, total: 4620.19, growthRate: 4.4 },
  { year: 2025, total: 4809.4, growthRate: 4.1 }
];


// ============================================================
// 十、农业现代化指标
// ============================================================
const modernizationData = {
  mechanization: { totalPower2020: 3901, totalPower2024: 3886, cropRate2020: 65.54, cropRate2024: 69.81, riceRate2024: 85.63, caneRate2024: 72.12, smartMachines2024: 52000 },
  water: [
    { year: 2020, totalWater: 261.1, agriWater: 186.9, agriShare: 71.6, perCapita: 520 },
    { year: 2021, totalWater: 268.5, agriWater: 189.6, agriShare: 70.6, perCapita: 534 },
    { year: 2022, totalWater: 264.0, agriWater: 190.0, agriShare: 71.9, perCapita: 524 },
    { year: 2023, totalWater: 258.5, agriWater: 182.5, agriShare: 70.6, perCapita: 513 },
    { year: 2024, totalWater: 250.5, agriWater: 179.7, agriShare: 71.7, perCapita: 499 }
  ],
  sciTechRate2024: 60.8,
  investment: [
    { year: 2020, rate: 9.9 }, { year: 2021, rate: 13.7 }, { year: 2022, rate: 2.2 },
    { year: 2023, rate: -22.3 }, { year: 2024, rate: 11.1 }
  ],
  brands: { greenOrgGeo2025: 2070, certArea2025: 4735, geoProducts2024: 97, brandValue2024: 5000 }
};

// ============================================================
// 十一、14个地级市数据（2024年）
// ============================================================
const cityData = [
  { name: "南宁市", gdp: 5995.36, primaryGVA: 678.26, gvaGrowth: 4.0, gvaShare: 11.3, grain: 213.40, grainGrowth: 0.4, cane: 949.55, caneGrowth: -3.3, fruit: 541.42, fruitGrowth: 4.8, ruralIncome: 21815, incomeGrowth: 7.1, incomeRank: 6, tags: "糖料蔗第三大产区、火龙果、茉莉花茶" },
  { name: "柳州市", gdp: 2950.67, primaryGVA: 308.76, gvaGrowth: 3.7, gvaShare: 10.5, grain: 74.94, grainGrowth: 0.3, cane: 605.33, caneGrowth: -1.1, fruit: 149.63, fruitGrowth: 3.8, ruralIncome: 21158, incomeGrowth: 6.8, incomeRank: 7, tags: "螺蛳粉全产业链759.6亿元、柳城甘蔗" },
  { name: "桂林市", gdp: 2521.38, primaryGVA: 658.34, gvaGrowth: 3.9, gvaShare: 26.1, grain: 179.90, grainGrowth: 0.3, cane: null, caneGrowth: null, fruit: 1162.17, fruitGrowth: 5.1, ruralIncome: 22942, incomeGrowth: 6.4, incomeRank: 2, tags: "水果全区第一1162万吨、柑橘752万吨" },
  { name: "梧州市", gdp: 1621.72, primaryGVA: 264.48, gvaGrowth: 5.2, gvaShare: 16.3, grain: 72.05, grainGrowth: 0.9, cane: null, caneGrowth: null, fruit: 131.65, fruitGrowth: 5.3, ruralIncome: 19988, incomeGrowth: 7.0, incomeRank: 9, tags: "六堡茶近4万吨、综合产值近300亿元" },
  { name: "北海市", gdp: 1579.42, primaryGVA: null, gvaGrowth: null, gvaShare: null, grain: 32.57, grainGrowth: 1.3, cane: null, caneGrowth: null, fruit: 20.84, fruitGrowth: 6.0, ruralIncome: 22318, incomeGrowth: 6.6, incomeRank: 5, tags: "水产品128.45万吨、南珠、对虾" },
  { name: "防城港市", gdp: 1165.58, primaryGVA: 139.87, gvaGrowth: 4.6, gvaShare: 12.0, grain: 18.09, grainGrowth: 0.6, cane: null, caneGrowth: null, fruit: 16.19, fruitGrowth: 4.5, ruralIncome: 22855, incomeGrowth: 6.5, incomeRank: 3, tags: "边境贸易、金花茶、海洋渔业" },
  { name: "钦州市", gdp: 1880.95, primaryGVA: 398.50, gvaGrowth: 4.4, gvaShare: 21.2, grain: 95.75, grainGrowth: 0.9, cane: null, caneGrowth: null, fruit: 318.05, fruitGrowth: 3.2, ruralIncome: 20605, incomeGrowth: 6.7, incomeRank: 8, tags: "水果318万吨、大蚝养殖、坭兴陶" },
  { name: "贵港市", gdp: 1565.59, primaryGVA: 299.88, gvaGrowth: 5.1, gvaShare: 19.2, grain: 150.03, grainGrowth: 0.5, cane: null, caneGrowth: null, fruit: 70.33, fruitGrowth: 3.1, ruralIncome: 22370, incomeGrowth: 7.4, incomeRank: 4, tags: "富硒农业、粮食大市150万吨" },
  { name: "玉林市", gdp: 2349.52, primaryGVA: 458.34, gvaGrowth: 3.8, gvaShare: 19.5, grain: 166.70, grainGrowth: 0.7, cane: null, caneGrowth: null, fruit: 189.60, fruitGrowth: 4.8, ruralIncome: 23874, incomeGrowth: 7.3, incomeRank: 1, tags: "农村收入全区第一、荔枝、中药材" },
  { name: "百色市", gdp: 2009.64, primaryGVA: 337.62, gvaGrowth: 4.5, gvaShare: 16.8, grain: 113.47, grainGrowth: 0.7, cane: 283.96, caneGrowth: 13.5, fruit: 256.63, fruitGrowth: 5.8, ruralIncome: 18279, incomeGrowth: 7.7, incomeRank: 13, tags: "芒果121万吨全国第一、甘蔗增速最快" },
  { name: "贺州市", gdp: 963.55, primaryGVA: 192.71, gvaGrowth: 4.0, gvaShare: 20.0, grain: 61.86, grainGrowth: 0.7, cane: null, caneGrowth: null, fruit: 171.27, fruitGrowth: 5.5, ruralIncome: 18916, incomeGrowth: 7.5, incomeRank: 11, tags: "柑橘143万吨、预制菜、长寿食品" },
  { name: "河池市", gdp: 1404.15, primaryGVA: 285.51, gvaGrowth: 5.3, gvaShare: 20.3, grain: 98.82, grainGrowth: 1.0, cane: 368.14, caneGrowth: -5.6, fruit: 101.60, fruitGrowth: 6.2, ruralIncome: 15240, incomeGrowth: 7.6, incomeRank: 14, tags: "蚕桑全国第一(宜州)、核桃" },
  { name: "来宾市", gdp: 1030.42, primaryGVA: 224.81, gvaGrowth: 5.3, gvaShare: 21.8, grain: 74.73, grainGrowth: 0.8, cane: 1091.94, caneGrowth: -5.0, fruit: null, fruitGrowth: null, ruralIncome: 18783, incomeGrowth: 7.2, incomeRank: 12, tags: "甘蔗1092万吨全区第二、食糖110万吨" },
  { name: "崇左市", gdp: 1312.86, primaryGVA: 226.50, gvaGrowth: 4.0, gvaShare: 17.3, grain: null, grainGrowth: null, cane: 2404.71, caneGrowth: -6.2, fruit: 128.03, fruitGrowth: 4.5, ruralIncome: 19190, incomeGrowth: 7.1, incomeRank: 10, tags: "甘蔗2405万吨全国设区市第一、边贸" }
];


// ============================================================
// 十二、产业规模与经营主体
// ============================================================
const industryScaleData = {
  processingValue2023: 10000,
  processingGrowth2024: 5.3,
  foodProcessingGrowth2024: 17.4,
  conversionRate2023: 68.1,
  aboveScaleEnterprises2023: 3500,
  aboveScaleEnterprises100m: 400,
  foodProcessingValue2025: 3000,
  dragonHeadNational: 58,
  dragonHeadProvincial: 506,
  dragonHeadCity: 1312,
  cooperatives: 60700,
  familyFarms: 128800,
  industrialUnions2023: 305
};

// ============================================================
// 十三、全国排名汇总
// ============================================================
const nationalRankings = [
  { field: "糖料蔗", indicator: "种植面积、食糖产量", rank: "全国第一(连续34个榨季)", time: "2024/25榨季" },
  { field: "水果", indicator: "总产量", rank: "全国第一(连续8年)", time: "截至2025年" },
  { field: "蚕茧", indicator: "产量", rank: "全国第一(连续20年)", time: "截至2024年" },
  { field: "生丝", indicator: "产量", rank: "全国第一(连续15年)", time: "截至2024年" },
  { field: "林业", indicator: "产值", rank: "全国率先突破万亿", time: "2024年1.05万亿" },
  { field: "人造板", indicator: "产量", rank: "全国第一", time: "2024年7050万m3" },
  { field: "木材采伐", indicator: "发证蓄积量", rank: "全国第一", time: "2024年超5400万m3" },
  { field: "陆基循环水养殖", indicator: "圆池数量", rank: "全国第一", time: "截至2024年底3.3万个" },
  { field: "近江牡蛎", indicator: "产量", rank: "全国第一", time: "2023年71.55万吨" },
  { field: "柑橘", indicator: "产量", rank: "全国第一(占1/3)", time: "2024年" },
  { field: "火龙果", indicator: "产量/面积", rank: "全国第一", time: "连续多年" },
  { field: "百香果", indicator: "产量/面积", rank: "全国第一", time: "2024年" },
  { field: "柿子", indicator: "产量/面积", rank: "全国第一", time: "连续多年" },
  { field: "芒果", indicator: "产量", rank: "全国第二", time: "2024年" },
  { field: "香蕉", indicator: "产量", rank: "全国第二(26.9%)", time: "2024年" },
  { field: "荔枝", indicator: "产量", rank: "全国第二(约31%)", time: "2024年" },
  { field: "龙眼", indicator: "产量", rank: "全国第二", time: "2023年" },
  { field: "南美白对虾", indicator: "产量", rank: "全国第二", time: "2023年" },
  { field: "金鲳鱼", indicator: "产量", rank: "全国第二", time: "2023年" },
  { field: "罗非鱼", indicator: "产量", rank: "全国第三", time: "2023年" },
  { field: "渔业", indicator: "总产量", rank: "全国第八、西部第一", time: "2023年" }
];

// ============================================================
// 公告数据(保留原有)
// ============================================================
const announcementData = [
  { id: 1, title: "领先！广西糖料蔗种植面积与食糖产量连续34个榨季居全国第一", content: "据广西云-广西日报报道：2024/25年榨季广西糖料蔗种植面积1135万亩，同比增加11万亩；食糖产量约646万吨，同比增加约28万吨；产糖率约13.3%。", createdAt: "2025-12-10", sourceName: "广西云-广西日报", sourceUrl: "https://www.gxnews.com.cn/staticpages/20251210/newgx693956f6-21881163.shtml" },
  { id: 2, title: "广西：2024/2025年榨季食糖产量超640万吨(新华社)", content: "新华社报道：2024/2025年榨季广西糖料蔗种植面积1135万亩，食糖产量646.5万吨，同比增加28.36万吨。", createdAt: "2025-07-02", sourceName: "新华财经", sourceUrl: "https://m.cnfin.com/dz-lb/zixun/20250702/4261312_1.html" },
  { id: 3, title: "广西出台政策提高糖料蔗生产机械化水平(2024-2025)", content: "农业农村部网站消息：广西印发《2024-2025年广西糖料蔗良法技术推广工作实施方案》。", createdAt: "2024-08-22", sourceName: "农业农村部", sourceUrl: "https://www.moa.gov.cn/xw/qg/202408/t20240822_6461158.htm" },
  { id: 4, title: "广西财政五聚力撑稳糖罐子(资金支持50.99亿元)", content: "2023年以来广西财政厅筹措中央和自治区资金50.99亿元，重点支持良种推广、全程机械化、科技创新等。", createdAt: "2024-06-19", sourceName: "中新网广西", sourceUrl: "https://www.gx.chinanews.com.cn/cj/2024-06-19/detail-ihecnkzk2009819.shtml" },
  { id: 5, title: "2025年广西经济发布：粮食总产1404.4万吨实现双增长", content: "广西统计局发布2025年经济运行数据：全年粮食总产量1404.4万吨、播种面积2846.9千公顷，实现‘双增长’，第一产业增加值4631.71亿元。", createdAt: "2026-01-26", sourceName: "广西壮族自治区统计局", sourceUrl: "http://tjj.gxzf.gov.cn/tjsj/xwfb/tjxx_sjfb/t27180801.shtml" },
  { id: 6, title: "广西粮食播种面积和总产量实现‘六连增’", content: "广西农业农村厅转载国家统计局数据：2025年全区粮食播种面积4270.35万亩、总产1404.4万吨，粮食播种面积与总产量连续6年实现‘双增长’。", createdAt: "2025-12-16", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/njtg/zxyw/t27071289.shtml" },
  { id: 7, title: "广西林草产业总产值达1.16万亿元 稳居全国首位", content: "自治区政府门户网站报道：2025年广西林草产业总产值达1.16万亿元，人造板产量超7500万立方米，均稳居全国首位。", createdAt: "2026-01-26", sourceName: "广西壮族自治区人民政府", sourceUrl: "http://www.gxzf.gov.cn/gxyw/t27181042.shtml" },
  { id: 8, title: "广西电商交出亮眼答卷：农产品网络零售额突破百亿元", content: "人民网广西频道报道：2025年广西农产品网络零售额突破百亿元；其中农村网络零售额超230亿元，同比增长15.6%，水果网络零售额增长26.4%。", createdAt: "2026-02-01", sourceName: "人民网广西频道", sourceUrl: "http://gx.people.com.cn/n2/2026/0201/c179464-41489420.html" },
  { id: 9, title: "广西水果产量近3400万吨 连续七年全国第一", content: "广西农业农村厅发布水果产业大会信息：2024年广西水果产量近3400万吨，连续七年全国第一，柑橘、柿子、火龙果、百香果等产量位居全国前列。", createdAt: "2025-11-10", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xwdt/gxlb/nn/t26213920.shtml" },
  { id: 10, title: "广西2025年畜牧业较快增长 猪牛羊禽肉产量增长5.9%", content: "广西统计局发布数据显示：2025年全区猪牛羊禽肉产量同比增长5.9%，其中猪肉增长11.7%，生猪出栏4005.53万头、存栏2774.92万头。", createdAt: "2026-01-26", sourceName: "广西壮族自治区统计局", sourceUrl: "http://tjj.gxzf.gov.cn/tjsj/xwfb/tjxx_sjfb/t27180801.shtml" },
  { id: 11, title: "广西蚕茧产量48.47万吨 连续20年全国第一", content: "广西农业农村厅在人大建议答复中公布：2024年全区蚕茧产量48.47万吨，连续20年全国第一；生丝产量1.892万吨，占全国46.42%。", createdAt: "2025-05-19", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xxgk/jcxxgk/jytajggk/t25954214.shtml" },
  { id: 12, title: "2024年广西水产品产量387.02万吨 海水产品226.77万吨", content: "广西统计公报显示：2024年全区水产品产量387.02万吨，同比增长2.7%；其中海水产品产量226.77万吨，同比增长2.7%。", createdAt: "2025-04-03", sourceName: "广西壮族自治区统计局", sourceUrl: "http://tjj.gxzf.gov.cn/tjsj/tjgb/qqgb/t19769919.shtml" },
  { id: 13, title: "广西2025年蔬菜及食用菌产量同比增长4.1%", content: "广西农业农村厅转载经济年报：2025年全区蔬菜及食用菌产量同比增长4.1%，与园林水果增速一致，农业生产形势良好。", createdAt: "2026-01-26", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xwdt/ywkb/t27186299.shtml" },
  { id: 14, title: "广西累计建成冷藏保鲜设施4873个 库容约293万立方米", content: "自治区政府门户转载《瞭望》报道：2020年以来广西累计建成农产品产地冷藏保鲜设施4873个，库容约293万立方米，鲜活农产品溢价收益提升约25%。", createdAt: "2025-10-25", sourceName: "广西壮族自治区人民政府", sourceUrl: "http://www.gxzf.gov.cn/zzqzyxx/t26095474.shtml" },
  { id: 15, title: "自治区农业农村厅公布2026年工作计划：主要农作物综合机械化率达71.1%", content: "自治区农业农村厅发布2025年工作情况和2026年计划，提出实施糖料蔗机械化收获三年行动，主要农作物耕种收综合机械化率达到71.1%。", createdAt: "2026-03-02", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xxgk/jcxxgk/ghjh/ndjh/t27308561.shtml" },
  { id: 16, title: "河池市发布2025年经济运行数据：蚕茧产量23.18万吨增长6.1%", content: "河池市统计局发布2025年经济数据：全市蚕茧产量23.18万吨，同比增长6.1%；粮食总产99.2万吨，园林水果105.96万吨。", createdAt: "2026-01-29", sourceName: "河池市统计局", sourceUrl: "http://tjj.gxzf.gov.cn/tjsj/jdfx/sx/t27222356.shtml" }
];

function parseAnnouncementDate(value) {
  if (!value) return 0;
  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) return parsed;

  const text = String(value);
  const yearMonth = text.match(/(\d{4})\D+(\d{1,2})/);
  if (yearMonth) return Date.UTC(Number(yearMonth[1]), Number(yearMonth[2]) - 1, 1);

  const yearOnly = text.match(/(\d{4})/);
  if (yearOnly) return Date.UTC(Number(yearOnly[1]), 0, 1);

  return 0;
}

function getSortedAnnouncementData() {
  if (!Array.isArray(announcementData)) return [];
  const seenIds = new Set();

  return announcementData
    .filter(function(item) {
      if (!item || typeof item !== 'object') return false;

      const id = Number(item.id);
      if (!Number.isFinite(id) || id <= 0) {
        console.warn('[announcementData] invalid id:', item && item.id);
        return false;
      }
      if (seenIds.has(id)) {
        console.warn('[announcementData] duplicate id:', id);
        return false;
      }
      seenIds.add(id);

      if (!item.createdAt) {
        console.warn('[announcementData] missing createdAt for id:', id);
      }
      return true;
    })
    .sort(function(a, b) {
      return parseAnnouncementDate(b.createdAt) - parseAnnouncementDate(a.createdAt);
    });
}

// ============================================================
// 研究成果数据(保留原有)
// ============================================================
const researchData = [
  { id: 1, title: "【种业芯片】桂糖44号获广西科技进步一等奖", abstract: "2025年广西科学技术奖励大会上，桂糖44号和桂糖42号培育项目荣获科技进步一等奖。", content: "桂糖44号是全国首个大面积推广的强宿根、宜机收品种。2024年种植面积达217.5万亩。", author: "广西农业科学院", sourceName: "广西农业科学院", sourceUrl: "http://www.gxaas.net/front/detail/146/9140/149683", createdAt: "2025年7月" },
  { id: 2, title: "【智能装备】首创滴滴农机智能调度平台与纯电收割机", abstract: "广西农机中心推出滴滴农机智能调度平台，联合研发纯电驱动甘蔗割堆机。", content: "针对广西丘陵地形找机难痛点，实现农机作业一键下单。纯电驱动每吨收割成本仅需1度电。", author: "广西农机化服务中心", sourceName: "广西农机化服务中心", sourceUrl: "http://njfwzx.gxzf.gov.cn/ywzl/njsp/njjs/t19494413.shtml", createdAt: "2025年1月" },
  { id: 3, title: "【基础研究】广西大学破译现代甘蔗基因组密码", abstract: "广西大学张积森教授团队在Nature Genetics发表成果，解析现代栽培种甘蔗复杂基因组。", content: "成功解析新台糖22号的复杂基因组，为全球甘蔗分子育种提供导航图。", author: "广西大学", sourceName: "广西大学", sourceUrl: "https://www.gxu.edu.cn/info/1004/37456.htm", createdAt: "2025年1月" },
  { id: 4, title: "【数字标杆】桂链+工业互联网：甘蔗的数字身份证", abstract: "入选工信部2024年城市制造业高质量发展实践案例。通过工业互联网与区块链融合实现全程追溯。", content: "数据上链超10万条，推动糖业供应链协同效率提升30%。", author: "工信部/人民网", sourceName: "人民网", sourceUrl: "http://gx.people.com.cn/n2/2024/1219/c179430-41080381.html", createdAt: "2024年12月" },
  { id: 5, title: "【绿色循环】微生物吃废料，产出高值有机肥", abstract: "广西大学团队开发高效微生物菌剂，将滤泥、蔗渣等废弃物转化为高值生物有机肥。", content: "该技术可使甘蔗增产20%-40%，形成绿色循环闭环。", author: "新华网/广西大学", sourceName: "泛糖科技", sourceUrl: "https://www.hisugar.com/home/articleContent?id=2024031408571556340651", createdAt: "2024年3月" },
  { id: 6, title: "【高端制造】国产注射级药用蔗糖打破国际垄断", abstract: "中粮崇左糖业成功研发国内第一瓶注射级蔗糖并量产，填补国内空白。", content: "产品纯度极高，用于生物制药(疫苗辅料)，标志广西糖业从吃向医的高端化跨越。", author: "广西广播电视台", sourceName: "泛糖科技", sourceUrl: "https://www.hisugar.com/home/articleContent?id=2024011916290194967366", createdAt: "2024年1月" },
  { id: 7, title: "【现代渔业】科技赋能书写广西渔业新篇", abstract: "广西加快智慧渔业和设施渔业建设，陆基循环水养殖圆池达3.3万个，产业效率持续提升。", content: "广西农业农村厅发布现代渔业发展纪实：2024年全区水产品总产量达387万吨，位居全国第8、西部第1；52个“人工智能+智慧渔业”试点基地推动生产效率提升。", author: "广西农业信息中心", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xwdt/ywkb/t26116618.shtml", createdAt: "2025-10-31" },
  { id: 8, title: "【特色作物】广西特色作物研究院成果亮相2025农博会", abstract: "桂柚1号、桂橘一号等特色作物新品种集中亮相，科研成果面向市场展示推广。", content: "2025年广西国际农业博览会上，广西特色作物研究院展示柑橘、柿、食用菌、中药材等新品种与加工产品，体现特色农业科技成果转化与市场认可。", author: "广西特色作物研究院", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/tszwyjy/kxyj/kycg/t26151128.shtml", createdAt: "2025-11-10" },
  { id: 9, title: "【种业创新】广西公布2025年主要农作物品种统一试验结果", abstract: "自治区种子管理站公布水稻等作物统一试验结果，建议审定多个新品种。", content: "自治区种子管理站公布2025年广西主要农作物统一试验结果和2026年新参试信息，提出10个建议提交审定水稻品种，进一步夯实优良品种供给能力。", author: "广西种子管理站", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/gxzy/zwgk85100/t27189357.shtml", createdAt: "2026-01-27" },
  { id: 10, title: "【农业科技】广西农科院90周年成果集中发布", abstract: "广西农科院在优良品种选育、重大技术攻关和成果转化方面持续突破。", content: "广西科技厅转载报道显示：广西农科院在2025年广西科学技术奖励大会上有17项成果获奖，围绕“桂字号”良种、绿色植保和农产品加工等方向形成系列成果。", author: "广西日报", sourceName: "广西科技厅", sourceUrl: "http://kjt.gxzf.gov.cn/dtxx_59340/kjdt/t26056724.shtml", createdAt: "2025-10-16" },
  { id: 11, title: "【智慧农业】广西馆在2025智博会集中展示“五化升级”成果", abstract: "广西在2025智慧农业博览会展示生产精准化、装备智能化等“五化升级”路径。", content: "广西农业农村厅发布信息显示，广西馆在2025智博会上集中展示智慧农业成果，突出“北上广研发+广西集成+东盟应用”路径，推动农业数字化与国际合作。", author: "广西农业农村厅", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xwdt/ywkb/t26146147.shtml", createdAt: "2025-11-06" },
  { id: 12, title: "【成果转化】广西农科院第二届百项科技成果推介签约会达成6550万元签约", abstract: "广西农科院在第二届百项科技成果推介签约会上推动成果转化，签约金额6550万元。", content: "广西农业科学院发布会讯显示，第二届百项科技成果推介签约会现场签约9项合作项目，总金额6550万元，并启动高价值专利拍卖，持续提升农业科技成果转化效能。", author: "广西农业科学院", sourceName: "广西农业科学院", sourceUrl: "http://www.gxaas.net/front/detail/120/3370/150720", createdAt: "2025-11-06" },
  { id: 13, title: "【科技小院】青秀蔬菜科技小院推动蔬菜育种与成果转化", abstract: "青秀蔬菜科技小院以分子育种、无人机施药和AI识别病虫害等技术推动蔬菜科研落地。", content: "广西农业农村厅转载“青秀发布”报道：2026年青秀蔬菜科技小院已收集700多份种质资源，在苦瓜、西瓜、甜瓜、黄瓜等作物上推进分子育种，并与企业合作推动新品种和加工样品落地。", author: "青秀发布", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xwdt/gxlb/nn/t27282306.shtml", createdAt: "2026-02-24" },
  { id: 14, title: "【农机创新】广西启动2026年农机研发制造推广应用一体化需求征集", abstract: "广西围绕糖料蔗、水稻等关键环节征集短板机具与技术需求，推进农机装备补短板。", content: "广西农业农村厅公告显示，2026年广西农机研发制造推广应用一体化需求征集聚焦粮油、经济作物、畜禽水产养殖、农产品加工和设施农业，重点解决糖料蔗、水稻等产业关键环节农机短板。", author: "农业机械化管理处", sourceName: "广西农业农村厅", sourceUrl: "http://nynct.gxzf.gov.cn/xxgk/jcxxgk/tzgg/t26058669.shtml", createdAt: "2025-10-16" }
];

function getSortedResearchData() {
  if (!Array.isArray(researchData)) return [];
  return [...researchData].sort(function(a, b) {
    if (typeof parseAnnouncementDate === 'function') {
      return parseAnnouncementDate(b.createdAt) - parseAnnouncementDate(a.createdAt);
    }
    return Date.parse(b.createdAt || '') - Date.parse(a.createdAt || '');
  });
}

// ============================================================
// 五·3 其他畜产品
// ============================================================
const livestockOtherData = [
  { year: 2024, eggs: 40.76, eggsGrowth: 22.2, milk: 13.70, milkGrowth: -0.6 },
  { year: 2025, eggs: 55.39, eggsGrowth: 35.9, milk: 14.06, milkGrowth: 2.6 }
];

const livestockChainData = {
  poultryRank2023: "全国第四",
  feedRank2023: "全国第三",
  slaughterTarget2025: 25,
  integratedTarget2025: 17,
  pigPriceRange: "11-16元/公斤(2024-2025年广西)"
};

// ============================================================
// 六·3 渔业产业链细分
// ============================================================
const fisheryChainData = {
  economicValue: [
    { year: 2021, value: 1177.51 },
    { year: 2023, value: 1251.54 },
    { year: 2024, value: 1276.53 }
  ],
  secondaryTertiaryShare2024: 54.10,
  facilityFishShare2024: 65,
  marineGVA2024: 250.9,
  processingGVA2024: 14.3,
  beihaiProcessingValue2024: 80.3,
  target2025: 1600,
  outputTarget2025: 390
};

// ============================================================
// 七·2 林业细分补充
// ============================================================
const forestryChainData = {
  tourismValue2024: 2300,
  forestFarmValue2024: 1388,
  plantingArea2024: 289.53,
  plantingArea2025: 319.35,
  woodProcessingValue2023: 3900,
  bambooExportCountries: 60
};

// 柑橘/砂糖橘价格
const citrusPriceData = [
  { season: "2024/25", variety: "砂糖橘", priceRange: "2-3.5元/斤", note: "产量恢复，价格承压" },
  { season: "2024/25", variety: "金桔(融安)", priceRange: "7-13元/斤", note: "减产支撑价格" }
];


// ============================================================
const specialCropsData = [
  { name: "油料", output: 84.35, growth: 4.5 },
  { name: "油茶籽", output: 46.51, growth: 10.9 },
  { name: "天然松脂", output: 80.72, growth: 4.8 },
  { name: "茶叶", output: 12.97, growth: 8.0 }
];

// 主要农作物播种面积（千公顷）
const sowingAreaData = [
  { crop: "粮食", area2024: 2841.8, area2025: 2846.9 },
  { crop: "蔬菜", area2024: 1750.4, area2025: null },
  { crop: "果园", area2024: 1412.8, area2025: null },
  { crop: "甘蔗", area2024: 840.3, area2025: null },
  { crop: "油料", area2024: 293.2, area2025: null },
  { crop: "茶园", area2024: 112.5, area2025: null }
];

// ============================================================
// 九·2·1 蔬菜与特色食品产业链补充
// ============================================================
const vegetableChainData = {
  externalSupply: 1000,
  hezhou: { prepackagedOutput2023: 11, prepackagedValue2023: 8 },
  luosifen: {
    exportValue2023: 87.272,
    exportValue2024: 8732.3,
    exportGrowth20212024: 66.1,
    exportCountries: 20
  }
};

// ============================================================
// 十·3 农业科技补充
// ============================================================
const sciTechData = {
  gxRate2024: 60.8,
  gxRate2023: 57.34
};

// ============================================================
// 十·6 农产品品牌认证补充
// ============================================================
const brandCertData = {
  greenOrgGeo2023: 1739,
  greenOrgGeo2024: 1866,
  greenOrgGeo2025: 2070,
  certArea2025: 4735,
  geoProducts2024: 97,
  brandProductValue2024: 1600,
  brandValue2024: 5000
};

// ============================================================
// 八·3 蚕桑产业链细分
// ============================================================
const silkwormChainData = {
  enterprises2023: 112,
  rawSilkOutput2023: 1.75,
  rawSilkShare2023: 45.44,
  fabricOutput2023: 2024,
  hechiFarmValue2024: 46.17,
  hechiShare: 35.52,
  yizhouValue2024: 46.75,
  yizhouExport2024: 1.48,
  hechiTarget2025: 500
};

// ============================================================
// 十·5 财政支农
// ============================================================
const fiscalAgriData = [
  { year: 2020, expenditure: 904.38 },
  { year: 2021, expenditure: 756.83 },
  { year: 2022, expenditure: 737.75 }
];

// ============================================================
// 十三、农产品流通与贸易
// ============================================================
const tradeData = {
  ecommerce: { value2025: 100, growth2025: 18.8, growth2024: 14.1 },
  asean: { total2024: 300, export2024: 106.1, vietnamTrade2024: 183.7, export2023: 152.4 },
  coldChain: { facilities: 4873, capacity: 293, priceBoost: 25, vegExport: 1000 },
  specialProducts: [
    { name: "螺蛳粉全产业链", value: "759.6亿元", growth: "+13.4%", time: "2024年" },
    { name: "螺蛳粉袋装销售", value: "169亿元", growth: null, time: "2024年" },
    { name: "螺蛳粉出口货值", value: "8732.3万元", growth: null, time: "2024年" },
    { name: "六堡茶综合产值", value: "近300亿元", growth: null, time: "2024年" },
    { name: "桂字号品牌总产值", value: "超1600亿元", growth: null, time: "2024年" },
    { name: "桂字号品牌总价值", value: "超5000亿元", growth: null, time: "2024年" }
  ]
};

// ============================================================
// 八大产业Tab配置(统计页用)
// ============================================================
const industryTabs = [
  { id: "overview", name: "综合总览", icon: "bi-bar-chart-line" },
  { id: "grain", name: "粮食", icon: "bi-basket" },
  { id: "sugar", name: "糖料蔗", icon: "bi-flower1" },
  { id: "fruit", name: "水果", icon: "bi-apple" },
  { id: "livestock", name: "畜牧业", icon: "bi-piggy-bank" },
  { id: "fishery", name: "渔业", icon: "bi-water" },
  { id: "forestry", name: "林业", icon: "bi-tree-fill" },
  { id: "silkworm", name: "蚕桑", icon: "bi-bug" },
  { id: "vegetable", name: "蔬菜", icon: "bi-flower2" },
  { id: "modernization", name: "农业现代化", icon: "bi-gear" },
  { id: "cities", name: "地级市", icon: "bi-geo-alt" },
  { id: "scale", name: "产业规模", icon: "bi-building" },
  { id: "rankings", name: "全国排名", icon: "bi-award" }
];
