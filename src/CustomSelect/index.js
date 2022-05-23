export class CustomSelect {
  constructor(data, parent) {
    this.data = data;
    this.treeData = this.constructObject(this.data);
    console.log(this.treeData);
    const content = this._createAccordion(this.treeData);
    parent.innerHTML = content;
  }
  _createAccordion = (tree, code = "") => {
    let text = "";
    let children = "";
    let siblings = "";
    for (const key in tree) {
      if (tree[key].children) {
        console.log(tree[key].children);
        code = key.length === 0 ? key : key.length === 1 ? "0" + key + "." : key + ".";

        children = this._createAccordion(tree[key].children, code);
        siblings += children;
        const fixBugCode = key.length === 1 ? "0" + key : key;
        text = fixBugCode + " " + tree[key].value;
        const res = this._createAccordionItem(text, siblings);
        return res;
      }

      text = code + " " + key + " " + tree[key].value;
      const res = this._createAccordionItem(text, children);
      return res;
    }
  };

  _createAccordionItem = (value, childrens) => {
    return `
    <div class="accordion-item">
      <h2 class="accordion-header" id="${value}">
        <button class="accordion-button spoiler__header" type="button"
          data-bs-toggle="collapse" data-bs-target="#${value}" aria-expanded="true"
          aria-controls="${value}">
          ${value}
        </button>
      </h2>
      <div id="${value}" class="accordion-collapse collapse "
        aria-labelledby="${value}">
        <div class="custom-selector">
        ${childrens}
        </div>
      </div>
    </div>
    `;
  };
  constructObject = (data) => {
    const resultObj = {};
    Object.keys(data).forEach((key) => {
      const tmp = data[key].split(".");

      if (tmp.length === 1) {
        const code = parseInt(tmp, 10);
        resultObj[code] = {
          value: tmp[0].slice(String(code).length + 1),
          children: {},
        };
      }
      if (tmp.length === 2) {
        const code = parseInt(tmp[0], 10);
        const code1 = parseInt(tmp[1], 10);

        resultObj[code].children[code1] = {
          value: tmp[1].slice(String(code1).length + 1),
        };
      }
      if (tmp.length === 3) {
        const code = parseInt(tmp[0], 10);
        const code1 = parseInt(tmp[1], 10);
        const code2 = parseInt(tmp[2], 10);
        resultObj[code].children[code1].children;
        if (!resultObj[code].children[code1].children) {
          resultObj[code].children[code1].children = {};
        }
        resultObj[code].children[code1].children[code2] = {
          value: tmp[2].slice(String(code2).length + 1),
        };
      }
    });
    return resultObj;
  };
}
