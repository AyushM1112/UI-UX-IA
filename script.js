const dropArea = document.getElementById("drop-area");
const fileElem = document.getElementById("fileElem");
const fileSelectBtn = document.getElementById("fileSelectBtn");
const preview = document.getElementById("preview");
const progress = document.getElementById("upload-progress");
const progressBar = document.querySelector(".progress-bar");
const gallery = document.getElementById("gallery");

// Trigger file input by button
fileSelectBtn.addEventListener("click", () => fileElem.click());

// File input change
fileElem.addEventListener("change", handleFiles);

// Drag & drop events
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");
  handleFiles({ target: { files: e.dataTransfer.files } });
});

function handleFiles(e) {
  const files = e.target.files;
  if (!files.length) return;

  [...files].forEach((file) => {
    previewFile(file);
    simulateUpload(file);
  });
}

// Show preview thumbnail
function previewFile(file) {
  if (!file.type.startsWith("image/")) return;
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  preview.innerHTML = "";
  preview.appendChild(img);
}

// Simulate upload progress
function simulateUpload(file) {
  progress.classList.remove("hidden");
  progressBar.style.width = "0";
  let progressValue = 0;

  const interval = setInterval(() => {
    progressValue += 10;
    progressBar.style.width = progressValue + "%";

    if (progressValue >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        progress.classList.add("hidden");
        addToGallery(file);
      }, 500);
    }
  }, 200);
}

// Add thumbnail to gallery
function addToGallery(file) {
  if (!file.type.startsWith("image/")) return;
  const item = document.createElement("div");
  item.classList.add("gallery-item");

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  const btn = document.createElement("button");
  btn.classList.add("remove-btn");
  btn.textContent = "Remove";
  btn.addEventListener("click", () => {
    item.classList.add("removing");
    setTimeout(() => item.remove(), 300);
  });

  item.appendChild(img);
  item.appendChild(btn);
  gallery.appendChild(item);
}