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
