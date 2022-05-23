const memoryBoundary20MB = 20 * 1024 * 1024;
const WARNING =
  "Загруженный файлне соответствует требованиям системы.Выберите файл в соотношении 1 к 1 размером не более 20 мб в форматах .jpg(jpeg) или png";
const defaultInfoText = "Загрузите фото в пропорции 1 к 1 в формате .jpg(jpeg), png";
export class FileInput {
  constructor(fileInput, infoElem, closeElem) {
    this.fileInput = fileInput;
    this.infoElem = infoElem;
    this.closeElem = closeElem;
    this._init();
  }
  _init = () => {
    this.fileInput.addEventListener("change", this._checkFile);
    this.closeElem.addEventListener("click", this._deleteFile);
  };
  _checkFile = async () => {
    let file = this.fileInput.files[0];
    const { size } = file;
    if (size > memoryBoundary20MB) {
      this._deleteFile();
      return alert(WARNING);
    }
    let fr = new FileReader();
    const img = new Image();
    fr.readAsDataURL(file);
    fr.onloadend = await function (e) {
      img.src = fr.result;
      this.file = img;
    }.bind(this);
    img.addEventListener("load", this._check1To1sizeImg);

    img.onload = await function () {
      if (this.file.height !== this.file.width) {
        this._deleteFile();
        return alert(WARNING);
      }
      this._showFile();
    }.bind(this);

    return;
  };

  _showFile = () => {
    let file = this.fileInput.files[0];
    const { size, name } = file;
    this.infoElem.textContent = `${name} (${Math.round(size / 1024)} кб)`;
    this.infoElem.classList.add("field__file-info_loaded");
    this.closeElem.classList.remove("display-none");
    this.infoElem.addEventListener("click", this._downloadFile);
    this.fileInput.disabled = true;
  };

  _deleteFile = () => {
    this.infoElem.textContent = defaultInfoText;
    this.closeElem.classList.add("display-none");
    this.fileInput.value = "";
    this.infoElem.classList.remove("field__file-info_loaded");

    this.infoElem.removeEventListener("click", this._downloadFile);
    this.fileInput.disabled = false;
  };
  _downloadFile = () => {
    let file = this.fileInput.files[0];
    let fr = new FileReader();
    fr.onloadend = function () {
      let link = document.createElement("a");
      link.href = fr.result;
      link.click();
    }.bind(this);
    fr.readAsDataURL(file);
  };
}
