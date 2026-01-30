const modal = document.getElementById('editModal');
const btnQuickEdit = document.getElementById('btnQuickEdit');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnApply = document.getElementById('btnApply');
const btnReset = document.getElementById('btnReset');
const toast = document.getElementById('toast');
const notifyDot = document.getElementById('notifyDot');
const btnHighlight = document.getElementById('btnHighlight');
const profileSnap = document.getElementById('profileSnap');

const fields = {
    name: document.getElementById('studentName'),
    dept: document.getElementById('dept'),
    year: document.getElementById('year'),
    ring: document.getElementById('ringPct'),
    ringFg: document.getElementById('ringFg')
};

const inputs = {
    name: document.getElementById('inpName'),
    dept: document.getElementById('inpDept'),
    year: document.getElementById('inpYear'),
    pct: document.getElementById('inpPct')
};

const notesBox = document.getElementById('notesBox');
const btnSaveNotes = document.getElementById('btnSaveNotes');
const btnClearNotes = document.getElementById('btnClearNotes');

const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
};

const openModal = () => {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    inputs.name.value = fields.name.textContent;
    inputs.dept.value = fields.dept.textContent;
    inputs.year.value = fields.year.textContent.replace('Year: ', '');
    inputs.pct.value = parseInt(fields.ring.textContent, 10) || 0;
};

const closeModal = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
};

btnQuickEdit?.addEventListener('click', openModal);
btnCloseModal?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

btnApply?.addEventListener('click', () => {
    fields.name.textContent = inputs.name.value || fields.name.textContent;
    fields.dept.textContent = inputs.dept.value || fields.dept.textContent;
    fields.year.textContent = inputs.year.value ? `Year: ${inputs.year.value}` : fields.year.textContent;

    const pct = Math.max(0, Math.min(100, Number(inputs.pct.value || 0)));
    fields.ring.textContent = `${pct}%`;
    const circumference = 2 * Math.PI * 46;
    const offset = circumference - (pct / 100) * circumference;
    fields.ringFg.style.strokeDasharray = `${circumference}`;
    fields.ringFg.style.strokeDashoffset = `${offset}`;

    showToast('Profile snapshot updated');
    closeModal();
});

btnReset?.addEventListener('click', () => {
    inputs.name.value = '';
    inputs.dept.value = '';
    inputs.year.value = '';
    inputs.pct.value = '';
});

btnHighlight?.addEventListener('click', () => {
    profileSnap?.classList.toggle('highlighted');
    showToast('Highlight toggled');
});

btnSaveNotes?.addEventListener('click', () => {
    localStorage.setItem('studentPortalNotes', notesBox.value);
    showToast('Notes saved');
});

btnClearNotes?.addEventListener('click', () => {
    notesBox.value = '';
    localStorage.removeItem('studentPortalNotes');
    showToast('Notes cleared');
});

window.addEventListener('load', () => {
    const savedNotes = localStorage.getItem('studentPortalNotes');
    if (savedNotes) {
        notesBox.value = savedNotes;
    }

    if (notifyDot) {
        notifyDot.style.display = 'block';
    }
});
