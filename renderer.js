const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});

const openBtn = document.getElementById("open-btn");
const filePathElement = document.getElementById("filePath");
openBtn.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.innerText = filePath;
});

const counter = document.getElementById("counter");
window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue.toString();
  window.electronAPI.counterValue(newValue);
});
