// 地市数据页 - 14个地级市农业数据展示
var cityChartInstance = null;

document.addEventListener('DOMContentLoaded', function() {
    renderCities();
    document.getElementById('btnSort').addEventListener('click', renderCities);
    document.getElementById('citySearch').addEventListener('input', renderCities);
});

function getFilteredCities() {
    var field = document.getElementById('sortField').value;
    var order = document.getElementById('sortOrder').value;
    var keyword = (document.getElementById('citySearch').value || '').trim();
    var list = cityData.slice();
    if (keyword) {
        list = list.filter(function(c) { return c.name.indexOf(keyword) >= 0 || (c.tags && c.tags.indexOf(keyword) >= 0); });
    }
    list.sort(function(a, b) {
        var va = a[field] || 0, vb = b[field] || 0;
        return order === 'desc' ? vb - va : va - vb;
    });
    return list;
}

function renderCities() {
    var list = getFilteredCities();
    renderChart(list);
    renderCards(list);
}

function renderChart(list) {
    var ctx = document.getElementById('cityChart');
    if (!ctx) return;
    if (cityChartInstance) { cityChartInstance.destroy(); cityChartInstance = null; }
    var field = document.getElementById('sortField').value;
    var labelMap = { primaryGVA: '第一产业增加值(亿元)', gdp: 'GDP(亿元)', grain: '粮食产量(万吨)', cane: '甘蔗入榨量(万吨)', fruit: '水果产量(万吨)', ruralIncome: '农村人均收入(元)' };
    cityChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: list.map(function(c) { return c.name.replace('市', ''); }),
            datasets: [{
                label: labelMap[field] || field,
                data: list.map(function(c) { return c[field] || 0; }),
                backgroundColor: 'rgba(25,135,84,0.7)',
                borderColor: 'rgba(25,135,84,1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false, indexAxis: 'y',
            scales: { x: { beginAtZero: true } },
            plugins: { legend: { display: false } }
        }
    });
}

function v(val, suffix) { return (val === null || val === undefined) ? '—' : val + (suffix || ''); }

function renderCards(list) {
    var container = document.getElementById('cityCards');
    if (!list.length) { container.innerHTML = '<div class="col-12"><p class="text-muted text-center py-4">未找到匹配城市</p></div>'; return; }
    var html = '';
    list.forEach(function(c, i) {
        html += '<div class="col-lg-6 col-xl-4 mb-4"><div class="card shadow-sm h-100">' +
            '<div class="card-header bg-success text-white d-flex justify-content-between align-items-center">' +
            '<h6 class="mb-0"><i class="bi bi-geo-alt"></i> ' + c.name + '</h6>' +
            '<span class="city-rank-chip">' + (i + 1) + '</span></div>' +
            '<div class="card-body"><div class="row g-2 text-center">' +
            miniStat('GDP', v(c.gdp) + '亿', 'text-dark') +
            miniStat('第一产业', v(c.primaryGVA) + '亿', 'text-success') +
            miniStat('增速', v(c.gvaGrowth, '%'), 'text-primary') +
            miniStat('占GDP', v(c.gvaShare, '%'), 'text-info') +
            miniStat('粮食', v(c.grain) + '万吨', 'text-dark') +
            miniStat('粮食增速', v(c.grainGrowth, '%'), 'text-success') +
            miniStat('甘蔗', v(c.cane) + '万吨', 'text-success') +
            miniStat('甘蔗增速', v(c.caneGrowth, '%'), 'text-primary') +
            miniStat('水果', v(c.fruit) + '万吨', 'text-danger') +
            miniStat('水果增速', v(c.fruitGrowth, '%'), 'text-danger') +
            miniStat('人均收入', v(c.ruralIncome) + '元', 'text-primary') +
            miniStat('收入增速', v(c.incomeGrowth, '%') + ' 排名第' + v(c.incomeRank), 'text-info') +
            '</div></div>' +
            '<div class="card-footer"><small class="text-muted"><i class="bi bi-tags"></i> ' + (c.tags || '') + '</small></div>' +
            '</div></div>';
    });
    container.innerHTML = html;
}

function miniStat(label, value, color) {
    return '<div class="col-3 mb-2"><div class="' + color + ' fw-bold small">' + value + '</div><div class="text-muted" style="font-size:0.7rem">' + label + '</div></div>';
}
