// 统计分析页 - 广西农业多产业Tab系统
// 性能优化：按需渲染，切换Tab时才创建图表

let chartInstances = {};

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
});

function initTabs() {
    const nav = document.getElementById('industryTabNav');
    if (!nav) return;
    let html = '';
    industryTabs.forEach(function(tab, i) {
        html += '<li class="nav-item me-1 mb-1" role="presentation">' +
            '<button class="nav-pill-btn btn btn-outline-success' + (i === 0 ? ' active' : '') + '" data-tab="' + tab.id + '">' +
            '<i class="bi ' + tab.icon + '"></i> ' + tab.name + '</button></li>';
    });
    nav.innerHTML = html;
    nav.querySelectorAll('.nav-pill-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            nav.querySelectorAll('.nav-pill-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            renderTab(btn.getAttribute('data-tab'));
        });
    });
    renderTab('overview');
}

function destroyCharts() {
    Object.keys(chartInstances).forEach(function(k) {
        if (chartInstances[k]) { chartInstances[k].destroy(); }
    });
    chartInstances = {};
}

function renderTab(tabId) {
    destroyCharts();
    var c = document.getElementById('tabContent');
    var fn = tabRenderers[tabId];
    if (fn) { fn(c); } else { c.innerHTML = '<p class="text-muted text-center py-5">暂无数据</p>'; }
}

// 通用：创建图表卡片HTML
function chartCard(title, canvasId, extra) {
    return '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0">' + title + '</h5></div>' +
        '<div class="card-body"><div style="position:relative;height:350px"><canvas id="' + canvasId + '"></canvas></div></div>' +
        (extra || '') + '</div>';
}

// 通用：年份折线图
function yearLineChart(canvasId, data, fields, labels, colors, options) {
    var ctx = document.getElementById(canvasId);
    if (!ctx) return;
    options = options || {};
    var years = data.map(function(d) { return d.year || d.season; });
    var datasets = fields.map(function(f, i) {
        return {
            label: labels[i],
            data: data.map(function(d) { return d[f]; }),
            borderColor: colors[i],
            backgroundColor: colors[i].replace('1)', '0.1)'),
            fill: fields.length === 1,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: colors[i]
        };
    });
    chartInstances[canvasId] = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: { labels: years, datasets: datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var raw = context.parsed && context.parsed.y;
                            var baseLabel = context.dataset.label + '：' + raw;
                            var point = data[context.dataIndex] || {};
                            if (typeof options.tooltipLabelFormatter === 'function') {
                                return options.tooltipLabelFormatter(baseLabel, point, context);
                            }
                            return baseLabel;
                        }
                    }
                }
            }
        }
    });
}

// 通用：数据表格
function dataTable(headers, rows) {
    var h = '<div class="card-body border-top"><div class="table-responsive"><table class="table table-sm table-hover mb-0"><thead><tr>';
    headers.forEach(function(th) { h += '<th>' + th + '</th>'; });
    h += '</tr></thead><tbody>';
    rows.forEach(function(r) {
        h += '<tr>';
        r.forEach(function(td) { h += '<td>' + (td === null || td === undefined ? '—' : td) + '</td>'; });
        h += '</tr>';
    });
    h += '</tbody></table></div></div>';
    return h;
}

function v(val, suffix) {
    if (val === null || val === undefined) return '—';
    return val + (suffix || '');
}

// ============================================================
// Tab渲染器
// ============================================================
var tabRenderers = {

// 综合总览
overview: function(c) {
    var tableRows = agriOverviewData.map(function(d) {
        return [d.year, v(d.primaryGVA), v(d.growthRate, '%'), v(d.gdpShare, '%'), v(d.grainOutput), v(d.ruralIncome), v(d.mechRate, '%')];
    });
    c.innerHTML =
        chartCard('<i class="bi bi-graph-up"></i> 第一产业增加值与增速（2020-2025）', 'overviewChart',
            dataTable(['年份', '增加值(亿元)', '增速(%)', 'GDP占比(%)', '粮食(万吨)', '农村人均收入(元)', '机械化率(%)'], tableRows)) +
        '<div class="row mt-3">' + overviewKpiCards() + '</div>';
    yearLineChart('overviewChart', agriOverviewData,
        ['primaryGVA', 'ruralIncome'],
        ['第一产业增加值(亿元)', '农村人均收入(元)'],
        ['rgba(25,135,84,1)', 'rgba(13,110,253,1)']);
},

// 粮食
grain: function(c) {
    var rows = grainData.map(function(d) {
        return [d.year, v(d.total), v(d.rice), v(d.corn), v(d.growthRate, '%'), v(d.sowingArea)];
    });
    c.innerHTML = chartCard('<i class="bi bi-basket"></i> 粮食总产量趋势（2020-2025）', 'grainChart',
        dataTable(['年份', '总产量(万吨)', '稻谷(万吨)', '玉米(万吨)', '增速(%)', '播种面积(万亩)'], rows));
    yearLineChart('grainChart', grainData, ['total'], ['粮食总产量(万吨)'], ['rgba(25,135,84,1)']);
},

// 糖料蔗
sugar: function(c) {
    var rows = yearlyProductionData.map(function(d) {
        return [d.season, v(d.sugarOutput), v(d.caneInput), v(d.sugarRate, '%'), v(d.plantingArea)];
    });
    var kpi = '<div class="row mt-3">' +
        kpiCard('连续全国第一', sugarKeyIndicators.consecutiveFirst + '个榨季', 'text-success') +
        kpiCard('全国产量占比', sugarKeyIndicators.nationalShare + '%', 'text-primary') +
        kpiCard('综合机械化率', sugarKeyIndicators.mechRate + '%', 'text-info') +
        kpiCard('良种覆盖率', sugarKeyIndicators.varietyCoverage + '%', 'text-warning') +
        '</div>';
    var priceRows = sugarPriceData.map(function(d) { return [d.season, v(d.avgPrice), v(d.range), d.trend]; });
    var priceTable = '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-currency-yen"></i> 白糖价格走势（元/吨）</h5></div>' +
        dataTable(['榨季', '均价(元/吨)', '价格区间', '走势'], priceRows) + '</div>';
    var chainRows = [
        ['蔗渣/糖蜜/滤泥综合利用率', '100%'],
        ['蔗叶综合利用率(2024/25)', '超40%'],
        ['综合利用产品种类', '超' + sugarKeyIndicators.byproductTypes + '个'],
        ['来宾全产业链产值(2024/25)', '突破' + sugarKeyIndicators.laibinChainValue2025 + '亿元'],
        ['来宾副产品综合利用产值', '超' + sugarKeyIndicators.laibinByproductValue + '亿元'],
        ['来宾蔗渣环保餐具年产能', sugarKeyIndicators.laibinBagasseCapacity + '万吨(全国最大基地)'],
        ['糖产业链工业产值目标(2025)', sugarKeyIndicators.industrialValueTarget2025 + '亿元'],
        ['糖产业链工业产值目标(2026)', sugarKeyIndicators.industrialValueTarget2026 + '亿元'],
        ['糖产业链工业产值目标(2027)', sugarKeyIndicators.industrialValueTarget2027 + '亿元']
    ];
    var chainTable = '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-recycle"></i> 糖业产业链细分</h5></div>' +
        dataTable(['指标', '数值'], chainRows) + '</div>';
    c.innerHTML = chartCard('<i class="bi bi-flower1"></i> 糖料蔗历年产量趋势', 'sugarChart',
        dataTable(['榨季', '产糖量(万吨)', '入榨量(万吨)', '产糖率(%)', '种植面积(万亩)'], rows)) + kpi + priceTable + chainTable + '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-calendar3"></i> ' + gxSugarMarketBrief.season + '榨季广西白糖现货日价（元/吨）</h5></div>' + dataTable(['日期', '价格区间(元/吨)'], gxSugarMarketBrief.prices.map(function(p){ return [p.date, p.low + '-' + p.high]; })) + '</div>';

    // 双Y轴图表
    var ctx = document.getElementById('sugarChart');
    if (!ctx) return;
    chartInstances['sugarChart'] = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: yearlyProductionData.map(function(d) { return d.season; }),
            datasets: [{
                label: '产糖量(万吨)', data: yearlyProductionData.map(function(d) { return d.sugarOutput; }),
                borderColor: 'rgba(25,135,84,1)', backgroundColor: 'rgba(25,135,84,0.2)', fill: true, tension: 0.4, yAxisID: 'y', pointRadius: 5
            }, {
                label: '产糖率(%)', data: yearlyProductionData.map(function(d) { return d.sugarRate; }),
                borderColor: 'rgba(255,193,7,1)', fill: false, tension: 0.4, yAxisID: 'y1', pointRadius: 5
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                y: { position: 'left', title: { display: true, text: '产糖量(万吨)' }, min: 500, max: 700 },
                y1: { position: 'right', title: { display: true, text: '产糖率(%)' }, min: 11, max: 14, grid: { drawOnChartArea: false } }
            }
        }
    });
},

// 水果
fruit: function(c) {
    var rows = fruitData.map(function(d) {
        var totalText = d && d.isEstimate
            ? '约' + v(d.total) + '（推算值）'
            : v(d.total);
        var noteText = d && d.isEstimate
            ? (d.note || '推算值')
            : '官方数据';
        return [d.year, totalText, noteText];
    });
    var varieties = '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-stars"></i> 主要品种全国排名</h5></div>' +
        dataTable(['品种', '产量', '排名'], fruitKeyIndicators.topVarieties.map(function(t) { return [t.name, t.output, t.rank]; })) + '</div>';
    var chainRows = [
        ['种植面积', '超' + fruitKeyIndicators.plantingArea + '万亩'],
        ['全产业链产值', '超' + fruitKeyIndicators.chainValue + '亿元'],
        ['脱贫县水果种植', fruitKeyIndicators.poorCountyCount + '个县、' + fruitKeyIndicators.poorCountyArea + '万亩、' + fruitKeyIndicators.poorCountyOutput + '万吨'],
        ['联农带农人数', '超' + fruitKeyIndicators.farmersSupported + '万人'],
        ['水果进出口总额(2023)', fruitKeyIndicators.exportTotal2023 + '亿元'],
        ['水果出口货值(2023)', fruitKeyIndicators.exportValue2023 + '亿元'],
        ['芒果全产业链产值', '约' + fruitKeyIndicators.mangoChainValue + '亿元(2024)'],
        ['加工与观光业产值目标(2025)', '突破200亿元'],
        ['流通增值目标(2025)', '600亿元']
    ];
    var chainTable = '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-check"></i> 水果产业链细分</h5></div>' +
        dataTable(['指标', '数值'], chainRows) + '</div>';
    var fruitNote = '<div class="card-body border-top"><p class="text-muted small mb-0"><i class="bi bi-info-circle"></i> 说明：2025年水果总产量“约3533万吨”为推算值，基于2024年3394.0万吨和2025年同比增长4.1%测算，非官方直接公布绝对值。</p></div>';
    c.innerHTML = chartCard('<i class="bi bi-tree"></i> 水果总产量趋势（2020-2025）', 'fruitChart',
        dataTable(['年份', '总产量(万吨)', '口径说明'], rows) + fruitNote) + varieties + chainTable;
    yearLineChart('fruitChart', fruitData, ['total'], ['水果总产量(万吨)'], ['rgba(231,76,60,1)'], {
        tooltipLabelFormatter: function(baseLabel, point) {
            return point && point.isEstimate
                ? baseLabel + '（推算值）'
                : baseLabel;
        }
    });
},

// 畜牧业
livestock: function(c) {
    var rows = livestockData.map(function(d) {
        return [d.year, v(d.meatTotal), v(d.pork), v(d.poultry), v(d.beef), v(d.mutton), v(d.pigOut), v(d.pigStock)];
    });
    var otherRows = livestockOtherData.map(function(d) {
        return [d.year, v(d.eggs) + '万吨', '+' + d.eggsGrowth + '%', v(d.milk) + '万吨', (d.milkGrowth > 0 ? '+' : '') + d.milkGrowth + '%'];
    });
    var chainRows = [
        ['禽肉产量全国排名(2023)', livestockChainData.poultryRank2023],
        ['饲料产量全国排名(2023)', livestockChainData.feedRank2023],
        ['生猪价格波动区间', livestockChainData.pigPriceRange],
        ['屠宰标准化示范厂目标(2025)', livestockChainData.slaughterTarget2025 + '家以上'],
        ['养殖屠宰加工一体化目标(2025)', livestockChainData.integratedTarget2025 + '家以上']
    ];
    c.innerHTML = chartCard('<i class="bi bi-piggy-bank"></i> 肉类总产量趋势（2020-2025）', 'livestockChart',
        dataTable(['年份', '肉类合计(万吨)', '猪肉', '禽肉', '牛肉', '羊肉', '生猪出栏(万头)', '生猪存栏(万头)'], rows)) +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-egg"></i> 其他畜产品</h5></div>' +
        dataTable(['年份', '禽蛋产量', '禽蛋增速', '牛奶产量', '牛奶增速'], otherRows) + '</div>' +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-check"></i> 畜牧业产业链细分</h5></div>' +
        dataTable(['指标', '数值'], chainRows) + '</div>';

    var ctx = document.getElementById('livestockChart');
    if (!ctx) return;
    chartInstances['livestockChart'] = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: livestockData.map(function(d) { return d.year; }),
            datasets: [
                { label: '猪肉(万吨)', data: livestockData.map(function(d) { return d.pork; }), backgroundColor: 'rgba(25,135,84,0.8)' },
                { label: '禽肉(万吨)', data: livestockData.map(function(d) { return d.poultry; }), backgroundColor: 'rgba(13,110,253,0.8)' },
                { label: '牛肉(万吨)', data: livestockData.map(function(d) { return d.beef; }), backgroundColor: 'rgba(255,193,7,0.8)' },
                { label: '羊肉(万吨)', data: livestockData.map(function(d) { return d.mutton; }), backgroundColor: 'rgba(220,53,69,0.8)' }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true, title: { display: true, text: '产量(万吨)' } } },
            plugins: { legend: { position: 'top' } }
        }
    });
},

// 渔业
fishery: function(c) {
    var rows = fisheryData.map(function(d) { return [d.year, v(d.total), v(d.seawater), v(d.growthRate, '%')]; });
    var products = '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-stars"></i> 特色水产品全国排名</h5></div>' +
        dataTable(['品种', '产量', '排名'], fisheryKeyIndicators.topProducts.map(function(t) { return [t.name, t.output, t.rank]; })) + '</div>';
    var chainRows = fisheryChainData.economicValue.map(function(d) { return [d.year + '年', d.value + '亿元']; });
    // already exists
    chainRows.push(['2025年目标', fisheryChainData.target2025 + '亿元以上']);
    chainRows.push(['水产品产量目标(2025)', fisheryChainData.outputTarget2025 + '万吨以上']);
    chainRows.push(['陆基循环水养殖圆池(2024)', fisheryKeyIndicators.circularPools / 10000 + '万个(全国第一)']);chainRows.push(['水产品加工业增加值(2024)', fisheryChainData.processingGVA2024 + '亿元']);chainRows.push(['渔民人均可支配收入(2023)', fisheryKeyIndicators.fishermanIncome2023 + '元']);
    var chainExtra = '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-check"></i> 渔业产业链细分</h5></div>' +
        dataTable(['指标', '数值'], chainRows) +
        '<div class="card-body border-top"><div class="row">' +
        kpiCard('二三产业占比(2024)', fisheryChainData.secondaryTertiaryShare2024 + '%', 'text-success') +
        kpiCard('设施渔业产量占比(2024)', '超' + fisheryChainData.facilityFishShare2024 + '%', 'text-primary') +
        kpiCard('海洋渔业增加值(2024)', fisheryChainData.marineGVA2024 + '亿元', 'text-info') +
        kpiCard('北海水产品加工产值(2024)', fisheryChainData.beihaiProcessingValue2024 + '亿元', 'text-warning') +
        '</div></div></div>';
    c.innerHTML = chartCard('<i class="bi bi-water"></i> 水产品总产量趋势（2020-2024）', 'fisheryChart',
        dataTable(['年份', '总产量(万吨)', '海水产品(万吨)', '增速(%)'], rows)) + products + chainExtra;
    yearLineChart('fisheryChart', fisheryData, ['total', 'seawater'], ['总产量(万吨)', '海水产品(万吨)'], ['rgba(52,152,219,1)', 'rgba(26,188,156,1)']);
},

// 林业
forestry: function(c) {
    var rows = forestryData.map(function(d) { return [d.year, v(d.timberOutput), v(d.growthRate, '%')]; });
    var kpi = '<div class="row mt-3">' +
        kpiCard('林草产业总产值', forestryKeyIndicators.totalValue2025 + '亿元(2025)', 'text-success') +
        kpiCard('人造板产量', forestryKeyIndicators.boardOutput2024 + '万m³(2024)', 'text-primary') +
        kpiCard('森林覆盖率', forestryKeyIndicators.forestCoverage + '%', 'text-info') +
        kpiCard('木材加工产值', forestryKeyIndicators.woodProcessingValue2024 + '亿元(2024)', 'text-warning') +
        '</div>';
    var chainRows = [
        ['林草产业总产值(2023)', forestryKeyIndicators.totalValue2023 + '亿元', '全国第一'],
        ['林草产业总产值(2024)', (forestryKeyIndicators.totalValue2024/10000).toFixed(3) + '万亿元', '全国首个破万亿'],
        ['人造板全国占比(胶合板)', forestryKeyIndicators.boardNationalShare + '%', '全国第一'],
        ['木衣架出口', forestryKeyIndicators.woodHangerExport, '全国第一'],
        ['林业规上企业(2024)', forestryKeyIndicators.enterprises2024 + '多家', '—'],
        ['木材加工和造纸产值(2023)', forestryChainData.woodProcessingValue2023 + '亿元', '—'],
        ['竹藤芒草编织制品出口', '远销' + forestryChainData.bambooExportCountries + '多国', '—'],
        ['林业旅游与休闲服务产值(2024)', forestryChainData.tourismValue2024 + '亿元', '—'],['林下经济产值(2024)', forestryChainData.forestFarmValue2024 + '亿元', '—'],['造林面积(2024)', forestryChainData.plantingArea2024 + '千公顷', '—'],['造林面积(2025)', '约' + forestryChainData.plantingArea2025 + '千公顷（推算值）', '基于2024年289.53千公顷和2025年规划口径测算'],['万亿林业产业目标(2025)', forestryKeyIndicators.totalValueTarget2025 + '亿元', '规划目标'],
        ['木材加工业产值目标(2025)', forestryKeyIndicators.woodProcessingTarget2025 + '亿元', '规划目标'],
        ['家具产量目标(2025)', forestryKeyIndicators.furnitureTarget2025 + '万套', '规划目标']
    ];
    c.innerHTML = chartCard('<i class="bi bi-tree-fill"></i> 木材产量趋势（2020-2025）', 'forestryChart',
        dataTable(['年份', '木材产量(万m³)', '增速(%)'], rows)) + kpi +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-check"></i> 林业产业链细分</h5></div>' +
        dataTable(['指标', '数值', '备注'], chainRows) + '</div>';
    yearLineChart('forestryChart', forestryData, ['timberOutput'], ['木材产量(万m³)'], ['rgba(39,174,96,1)']);
},

// 蚕桑
silkworm: function(c) {
    var rows = silkwormData.map(function(d) { return [d.year, v(d.cocoonOutput), v(d.nationalShare, '%')]; });
    var kpi = '<div class="row mt-3">' +
        kpiCard('蚕茧连续全国第一', silkwormKeyIndicators.cocoonFirstYears + '年', 'text-success') +
        kpiCard('生丝连续全国第一', silkwormKeyIndicators.silkFirstYears + '年', 'text-primary') +
        kpiCard('蚕农售茧收入', silkwormKeyIndicators.farmerIncome2024 + '亿元(2024)', 'text-info') +
        kpiCard('香云纱全国占比', silkwormKeyIndicators.xiangYunShaShare + '%', 'text-warning') +
        '</div>';
    var extraRows = [
        ['生丝产量(2024)', silkwormKeyIndicators.silkOutput2024 + '万吨', '占全国' + silkwormKeyIndicators.silkNationalShare + '%'],['丝绸工业总产值', '超' + silkwormKeyIndicators.industryValue + '亿元'],['连续超200亿元年数', silkwormKeyIndicators.consecutiveOver200 + '年'],
        ['发展蚕桑产业脱贫县', silkwormKeyIndicators.poorCounties + '个（共' + silkwormKeyIndicators.totalPoorCounties + '个脱贫县）']
    ];
    var chainRows = [
        ['丝绸加工企业(2023)', silkwormChainData.enterprises2023 + '家', '—'],
        ['生丝产量(2023)', silkwormChainData.rawSilkOutput2023 + '万吨', '占全国' + silkwormChainData.rawSilkShare2023 + '%'],
        ['坯绸产量(2023)', silkwormChainData.fabricOutput2023 + '万米', '—'],
        ['河池茧丝绸产值(2024)', silkwormChainData.hechiFarmValue2024 + '亿元', '占全区' + silkwormChainData.hechiShare + '%'],
        ['宜州茧丝绸产值(2024)', silkwormChainData.yizhouValue2024 + '亿元', '+20%'],
        ['宜州生丝出口(2024)', silkwormChainData.yizhouExport2024 + '亿元', '—'],
        ['河池全产业链目标(2025)', silkwormChainData.hechiTarget2025 + '亿元', '规划目标']
    ];
    c.innerHTML = chartCard('<i class="bi bi-bug"></i> 蚕茧产量与全国占比（2020-2024）', 'silkwormChart',
        dataTable(['年份', '蚕茧产量(万吨)', '全国占比(%)'], rows)) + kpi +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-check"></i> 蚕桑产业链细分</h5></div>' +
        dataTable(['指标', '数值', '备注'], chainRows) + '</div>';

    var ctx = document.getElementById('silkwormChart');
    if (!ctx) return;
    chartInstances['silkwormChart'] = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: silkwormData.map(function(d) { return d.year; }),
            datasets: [{
                label: '蚕茧产量(万吨)', data: silkwormData.map(function(d) { return d.cocoonOutput; }),
                backgroundColor: 'rgba(26,188,156,0.8)', yAxisID: 'y'
            }, {
                type: 'line', label: '全国占比(%)', data: silkwormData.map(function(d) { return d.nationalShare; }),
                borderColor: 'rgba(231,76,60,1)', fill: false, tension: 0.4, yAxisID: 'y1', pointRadius: 5
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                y: { position: 'left', title: { display: true, text: '产量(万吨)' }, beginAtZero: true },
                y1: { position: 'right', title: { display: true, text: '全国占比(%)' }, min: 40, max: 70, grid: { drawOnChartArea: false } }
            }
        }
    });
},

// 蔬菜
vegetable: function(c) {
    var rows = vegetableData.map(function(d) { return [d.year, v(d.total), v(d.growthRate, '%')]; });
    var cropRows = specialCropsData.map(function(d) { return [d.name, v(d.output) + '万吨', '+' + d.growth + '%', '2024年']; });
    var sowRows = sowingAreaData.map(function(d) { return [d.crop, v(d.area2024), v(d.area2025)]; });
    var chainRows = [
        ['蔬菜常年外调量', '超' + vegetableChainData.externalSupply + '万吨'],
        ['贺州预制菜加工量(2023)', vegetableChainData.hezhou.prepackagedOutput2023 + '万吨'],
        ['贺州预制菜产值(2023)', '超' + vegetableChainData.hezhou.prepackagedValue2023 + '亿元'],
        ['螺蛳粉全产业链(2024)', '759.6亿元'],
        ['螺蛳粉出口货值(2023)', vegetableChainData.luosifen.exportValue2023.toFixed(2) + '万元'],['螺蛳粉出口货值(2024)', vegetableChainData.luosifen.exportValue2024 + '万元'],
        ['螺蛳粉出口增幅(2021-2024)', '+' + vegetableChainData.luosifen.exportGrowth20212024 + '%'],
        ['螺蛳粉出口国家地区', vegetableChainData.luosifen.exportCountries + '多个']
    ];
    c.innerHTML = chartCard('<i class="bi bi-flower2"></i> 蔬菜总产量趋势（2020-2025）', 'vegetableChart',
        dataTable(['年份', '总产量(万吨)', '增速(%)'], rows)) +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-grid"></i> 其他特色农产品（2024年）</h5></div>' +
        dataTable(['产品', '产量', '增速', '时间'], cropRows) + '</div>' +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-list-check"></i> 蔬菜产业链细分</h5></div>' +
        dataTable(['指标', '数值'], chainRows) + '</div>' +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-map"></i> 主要农作物播种面积（千公顷）</h5></div>' +
        dataTable(['作物', '2024年', '2025年'], sowRows) + '</div>';
    yearLineChart('vegetableChart', vegetableData, ['total'], ['蔬菜总产量(万吨)'], ['rgba(46,204,113,1)']);
},

// 农业现代化
modernization: function(c) {
    var m = modernizationData;
    var b = brandCertData;
    var s = sciTechData;
    var waterRows = m.water.map(function(d) {
        return [d.year, v(d.totalWater), v(d.agriWater), v(d.agriShare, '%'), v(d.perCapita)];
    });
    var invRows = m.investment.map(function(d) { return [d.year, v(d.rate, '%')]; });
    var sciRows = [
        ['农业科技进步贡献率(2023)', s.gxRate2023 + '%'],
        ['农业科技进步贡献率(2024)', s.gxRate2024 + '%']
    ];
    var mechKpi = '<div class="row mt-3">' +
        kpiCard('综合机械化率(2024)', m.mechanization.cropRate2024 + '%', 'text-success') +
        kpiCard('水稻机械化率(2024)', m.mechanization.riceRate2024 + '%', 'text-primary') +
        kpiCard('甘蔗机械化率(2024)', m.mechanization.caneRate2024 + '%', 'text-info') +
        kpiCard('科技进步贡献率(2024)', m.sciTechRate2024 + '%', 'text-warning') +kpiCard('智能农机保有量(2024)', m.mechanization.smartMachines2024 / 10000 + '万台', 'text-danger') +kpiCard('农机总动力(2024)', m.mechanization.totalPower2024 + '万千瓦', 'text-secondary') +
        '</div>';
    var brandRows = [
        ['绿色有机地标农产品(2023)', b.greenOrgGeo2023 + '个'],
        ['绿色有机地标农产品(2024)', b.greenOrgGeo2024 + '个'],
        ['绿色有机地标农产品(2025)', b.greenOrgGeo2025 + '个'],
        ['认证面积(2025)', b.certArea2025 + '万亩'],
        ['地理标志保护产品(2024)', b.geoProducts2024 + '个'],
        ['桂字号品牌总产值(2024)', '超' + b.brandProductValue2024 + '亿元'],
        ['桂字号品牌总价值(2024)', '超' + b.brandValue2024 + '亿元']
    ];
    var fiscalRows = fiscalAgriData.map(function(d) { return [d.year, v(d.expenditure) + '亿元']; });
    c.innerHTML =
        mechKpi +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-droplet"></i> 农业用水量（2020-2024）</h5></div>' +
        dataTable(['年份', '总用水量(亿m³)', '农业用水(亿m³)', '农业占比(%)', '人均用水量(m³)'], waterRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-graph-up-arrow"></i> 第一产业固定资产投资增速</h5></div>' +
        dataTable(['年份', '投资增速(%)'], invRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-beaker"></i> 农业科技进步贡献率</h5></div>' +
        dataTable(['指标', '数值'], sciRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-cash-stack"></i> 财政支农（农林水事务支出）</h5></div>' +
        dataTable(['年份', '支出'], fiscalRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-patch-check"></i> 农产品品牌与认证</h5></div>' +
        dataTable(['指标', '数值'], brandRows) + '</div>';
},

// 地级市
cities: function(c) {
    var rows = cityData.map(function(d) {
        return [d.name, v(d.gdp), v(d.primaryGVA), v(d.gvaGrowth, '%'), v(d.gvaShare, '%'), v(d.grain), v(d.grainGrowth, '%'), v(d.cane), v(d.caneGrowth, '%'), v(d.fruit), v(d.fruitGrowth, '%'), v(d.ruralIncome), v(d.incomeGrowth, '%'), d.incomeRank, d.tags || '—'];
    });
    var incomeRows = cityData.slice().sort(function(a, b) { return b.ruralIncome - a.ruralIncome; }).map(function(d) {
        return [d.name, d.ruralIncome + '元', '+' + d.incomeGrowth + '%', d.incomeRank];
    });
    c.innerHTML =
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-geo-alt"></i> 广西14个地级市农业核心指标（2024年）</h5></div>' +
        dataTable(['地级市', 'GDP(亿元)', '第一产业增加值(亿元)', '增速(%)', '占GDP(%)', '粮食(万吨)', '粮食增速', '甘蔗(万吨)', '甘蔗增速', '水果(万吨)', '水果增速', '农村收入(元)', '收入增速', '排名', '特色产业'], rows) + '</div>' +
        '<div class="card shadow-sm mt-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-cash-coin"></i> 农村居民人均可支配收入排名</h5></div>' +
        dataTable(['地级市', '收入', '增速', '排名'], incomeRows) + '</div>';
},

// 产业规模
scale: function(c) {
    var s = industryScaleData;
    var enterpriseRows = [
        ['国家级龙头企业', s.dragonHeadNational + '家'],
        ['自治区级龙头企业', s.dragonHeadProvincial + '家'],
        ['市级龙头企业', s.dragonHeadCity + '家'],
        ['农民专业合作社', '约' + s.cooperatives / 10000 + '万家'],
        ['家庭农场', '约' + s.familyFarms / 10000 + '万户'],
        ['农业产业化联合体(2023)', s.industrialUnions2023 + '个'],['食品加工产业年产值目标(2025)', '超' + s.foodProcessingValue2025 + '亿元']
    ];
    var kpi = '<div class="row mt-3">' +
        kpiCard('农产品加工业总产值(2023)', '超' + s.processingValue2023 / 10000 + '万亿元', 'text-success') +
        kpiCard('农副食品加工增速(2024)', '+' + s.foodProcessingGrowth2024 + '%', 'text-primary') +
        kpiCard('综合加工转化率(2023)', s.conversionRate2023 + '%', 'text-info') +
        kpiCard('规上企业(2023)', '超' + s.aboveScaleEnterprises2023 + '家(亿元以上' + s.aboveScaleEnterprises100m + '家)', 'text-warning') +
        '</div>';
    var coldChainRows = [
        ['产地冷藏保鲜设施(2020年以来累计)', tradeData.coldChain.facilities + '个'],
        ['冷藏库容', tradeData.coldChain.capacity + '万立方米'],
        ['冷链溢价收益提升', '约' + tradeData.coldChain.priceBoost + '%'],
        ['蔬菜常年外调量(2024-2025)', '超' + tradeData.coldChain.vegExport + '万吨']
    ];
    var tradeRows = tradeData.specialProducts.map(function(t) { return [t.name, t.value, t.growth || '—', t.time]; });
    c.innerHTML =
        kpi +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-building"></i> 农业经营主体</h5></div>' +
        dataTable(['类型', '数量'], enterpriseRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-snow"></i> 冷链物流</h5></div>' +
        dataTable(['指标', '数值'], coldChainRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-shop"></i> 特色产业链产值</h5></div>' +
        dataTable(['产业', '产值', '增速', '时间'], tradeRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-globe"></i> 农产品贸易</h5></div><div class="card-body"><div class="row">' +
        kpiCard('与东盟进出口总额(2024)', '超300亿元', 'text-success') +kpiCard('与越南贸易额(2024年1-11月)', tradeData.asean.vietnamTrade2024 + '亿元', 'text-danger') +kpiCard('农产品出口额(2023)', tradeData.asean.export2023 + '亿元', 'text-secondary') +
        kpiCard('与东盟出口额(2024)', tradeData.asean.export2024 + '亿元', 'text-primary') +
        kpiCard('农产品网络零售额(2025)', '超' + tradeData.ecommerce.value2025 + '亿元', 'text-info') +
        kpiCard('电商增速(2025)', '+' + tradeData.ecommerce.growth2025 + '%', 'text-warning') +kpiCard('电商增速(2024)', '+' + tradeData.ecommerce.growth2024 + '%', 'text-secondary') +
        '</div></div></div>';
},

// 全国排名
rankings: function(c) {
    var first = nationalRankings.filter(function(r) { return r.rank.indexOf('全国第一') >= 0; });
    var other = nationalRankings.filter(function(r) { return r.rank.indexOf('全国第一') < 0; });
    var firstRows = first.map(function(r) { return [r.field, r.indicator, r.rank, r.time]; });
    var otherRows = other.map(function(r) { return [r.field, r.indicator, r.rank, r.time]; });
    var citrusRows = citrusPriceData.map(function(d) { return [d.variety, d.priceRange, d.note]; });
    c.innerHTML =
        '<div class="alert alert-success"><i class="bi bi-trophy-fill"></i> 广西共有 <strong>' + first.length + ' 项全国第一</strong>，另有多项全国前三。</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-trophy"></i> 全国第一项目</h5></div>' +
        dataTable(['领域', '指标', '排名', '时间'], firstRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-warning text-dark"><h5 class="mb-0"><i class="bi bi-award"></i> 其他全国前列</h5></div>' +
        dataTable(['领域', '指标', '排名', '时间'], otherRows) + '</div>' +
        '<div class="card shadow-sm mb-4"><div class="card-header bg-success text-white"><h5 class="mb-0"><i class="bi bi-currency-yen"></i> 柑橘价格走势（2024/25）</h5></div>' +
        dataTable(['品种', '价格范围', '备注'], citrusRows) + '</div>';
}

};

// KPI卡片
function kpiCard(label, value, colorClass) {
    return '<div class="col-md-3 col-6 mb-3"><div class="card text-center h-100"><div class="card-body">' +
        '<h4 class="' + colorClass + '">' + value + '</h4>' +
        '<p class="text-muted mb-0 small">' + label + '</p></div></div></div>';
}

// 综合总览KPI
function overviewKpiCards() {
    var d = agriOverviewData[agriOverviewData.length - 1];
    return kpiCard('第一产业增加值(2025)', d.primaryGVA + '亿元', 'text-success') +
        kpiCard('粮食总产量(2025)', d.grainOutput + '万吨', 'text-primary') +
        kpiCard('农村人均收入(2025)', d.ruralIncome + '元', 'text-info') +
        kpiCard('增速(2025)', d.growthRate + '%', 'text-warning');
}
