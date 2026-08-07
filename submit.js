const zone = document.getElementById('dropZone');
const input = document.getElementById('attachment');
const status = document.getElementById('fileStatus');

function updateStatus() {
  if (!input.files || input.files.length === 0) {
    status.textContent = 'No file selected';
    return;
  }
  const f = input.files[0];
  const mb = (f.size / 1024 / 1024).toFixed(1);
  status.textContent = `${f.name} — ${mb} MB`;
}

['dragenter','dragover'].forEach(type => {
  zone.addEventListener(type, e => {
    e.preventDefault();
    zone.classList.add('dragging');
  });
});
['dragleave','drop'].forEach(type => {
  zone.addEventListener(type, e => {
    e.preventDefault();
    zone.classList.remove('dragging');
  });
});
zone.addEventListener('drop', e => {
  if (!e.dataTransfer.files.length) return;
  input.files = e.dataTransfer.files;
  updateStatus();
});
input.addEventListener('change', updateStatus);