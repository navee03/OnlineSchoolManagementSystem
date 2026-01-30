const counters = document.querySelectorAll('.count');
const uploadInput = document.getElementById('uploadInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadList = document.getElementById('uploadList');

const animateCounts = () => {
    counters.forEach((counter) => {
        const target = Number(counter.dataset.count || 0);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            counter.textContent = current;
        }, 40);
    });
};

const addUploadItem = (name) => {
    const item = document.createElement('div');
    item.className = 'upload-item';
    item.innerHTML = `
        <span>${name}</span>
        <span class="status-pill success">Uploaded</span>
    `;
    uploadList.prepend(item);
};

uploadBtn?.addEventListener('click', () => {
    if (!uploadInput?.files?.length) {
        return;
    }

    Array.from(uploadInput.files).forEach((file) => {
        addUploadItem(file.name);
    });

    uploadInput.value = '';
});

window.addEventListener('load', animateCounts);
