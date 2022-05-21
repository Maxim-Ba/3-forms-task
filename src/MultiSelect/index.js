export class MultiSelect {
  constructor(listElem, clickedElem, spinner, phoneWithMask, govFlag) {
    this.listElem = listElem;
    this.items = document.querySelectorAll(".multiselect__element");
    this.clickedElem = clickedElem;
    this.govFlag = govFlag;
    this.spinner = spinner;
    this.phoneWithMask = phoneWithMask;

    this._init();
  }
  _init() {
    this.clickedElem.addEventListener("click", this._toggleDisplayBlock);
    this.items.forEach((item) => {
      item.addEventListener("click", this._select);
    });
  }
  _toggleDisplayBlock = () => {
    if (this.listElem.style.display === "block") {
      this.listElem.style.display = "none";
      return;
    }
    this.listElem.style.display = "block";
  };
  _select = (e) => {
    this.spinner.style.display = "block";
    this.selected = e.currentTarget;
    this._toggleDisplayBlock();
    this.spinner.style.display = "none";

    const telCode = this._getCode(this.selected);
    this.phoneWithMask.updateOptions({ mask: `+{${telCode}} 000-000-00-00` });
    const src = this._getImgPath(this.selected);
    this.govFlag.setAttribute("src", src);
    this.listElem.style.display = "none";
  };
  _getCode = (elem) => {
    const pattern = new RegExp("\\+[\\d]{1,4}\\s", "gi");
    const result = elem.innerHTML.match(pattern);
    return parseInt(result, 10);
  };

  _getImgPath = (elem) => {
    const img = elem.querySelector("img");
    const src = img.getAttribute("src");
    return src;
  };
}
