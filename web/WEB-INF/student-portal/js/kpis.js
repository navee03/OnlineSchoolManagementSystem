const kpiCounters = document.querySelectorAll('.count');

const animateKpiCounts = () => {
    kpiCounters.forEach((counter) => {
        const target = Number(counter.dataset.count || 0);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 25));
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

window.addEventListener('load', animateKpiCounts);
