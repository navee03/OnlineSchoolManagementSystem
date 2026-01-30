const stages = document.querySelectorAll('.stage');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const currentStage = document.getElementById('currentStage');

const updateProgress = (index) => {
    const pct = Math.round(((index + 1) / stages.length) * 100);
    progressFill.style.width = `${pct}%`;
    progressPercent.textContent = `${pct}%`;
};

stages.forEach((stage, index) => {
    stage.addEventListener('click', () => {
        stages.forEach((item) => item.classList.remove('active'));
        stage.classList.add('active');
        currentStage.textContent = stage.dataset.stage || 'Selected';
        updateProgress(index);
    });
});

window.addEventListener('load', () => {
    const activeIndex = Array.from(stages).findIndex((stage) => stage.classList.contains('active'));
    updateProgress(activeIndex >= 0 ? activeIndex : 0);
});
