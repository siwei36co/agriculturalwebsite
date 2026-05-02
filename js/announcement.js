// 公告详情页逻辑

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('announcementDetail');
    if (!container) return;

    const sorted = typeof getSortedAnnouncementData === 'function'
        ? getSortedAnnouncementData()
        : (Array.isArray(announcementData)
            ? [...announcementData].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
            : []);

    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get('id'));

    if (Number.isFinite(id) && id > 0) {
        const item = sorted.find(x => x.id === id);
        if (!item) {
            renderNotFound(container);
            return;
        }
        renderDetail(container, item);
        return;
    }

    renderList(container, sorted);
});

function renderNotFound(container) {
    container.innerHTML = `
        <div class="card-body text-center text-muted py-5">
            <i class="bi bi-exclamation-circle" style="font-size: 3rem;"></i>
            <p class="mt-3 mb-3">未找到该公告</p>
            <a class="btn btn-outline-success" href="index.html"><i class="bi bi-arrow-left"></i> 返回首页</a>
        </div>
    `;
}

function renderDetail(container, item) {
    const sourceLink = item.sourceUrl
        ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-decoration-none">
                <i class="bi bi-box-arrow-up-right"></i> 查看原文
           </a>`
        : '';

    container.innerHTML = `
        <div class="card-body">
            <h3 class="text-success mb-2">${escapeHtml(item.title || '')}</h3>
            <p class="text-muted small mb-4">
                <i class="bi bi-calendar3"></i> ${escapeHtml(item.createdAt || '—')}
                ${item.sourceName ? ` · <i class="bi bi-link-45deg"></i> ${escapeHtml(item.sourceName)}` : ''}
                ${sourceLink ? ` · ${sourceLink}` : ''}
            </p>
            <div class="mb-4" style="white-space: pre-wrap;">${escapeHtml(item.content || '')}</div>
            <div class="d-flex gap-2 flex-wrap">
                <a class="btn btn-success" href="index.html"><i class="bi bi-house"></i> 返回首页</a>
                ${item.sourceUrl ? `<a class="btn btn-outline-success" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right"></i> 打开原文</a>` : ''}
            </div>
        </div>
    `;
}

function renderList(container, items) {
    if (!items.length) {
        container.innerHTML = `
            <div class="card-body text-center text-muted py-5">
                <i class="bi bi-inbox" style="font-size: 3rem;"></i>
                <p class="mt-3 mb-0">暂无公告</p>
            </div>
        `;
        return;
    }

    const listHtml = items.map((item) => `
        <div class="announcement-item">
            <h6 class="mb-1">
                <a href="announcement.html?id=${item.id}" class="text-decoration-none text-success">
                    ${escapeHtml(item.title || '')}
                </a>
            </h6>
            <p class="text-muted small mb-1">
                <i class="bi bi-calendar3"></i> ${escapeHtml(item.createdAt || '—')}
                ${item.sourceName ? ` · ${escapeHtml(item.sourceName)}` : ''}
            </p>
            <p class="mb-0">${escapeHtml(truncateText(item.content || '', 120))}</p>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="card-body">
            ${listHtml}
        </div>
    `;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

