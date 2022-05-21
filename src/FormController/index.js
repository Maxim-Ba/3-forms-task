import { FileInput } from "../FileInput/index.js";
import { rules } from "../Validator/rules.js";
import { WARNINGS } from "./constants.js";

export class FormController {
  constructor(form, Validator, cb = console.log) {
    this.form = form;
    this.cb = cb;
    this.validator = new Validator(this.form, rules);
    this.passwordWarning = document.getElementById("password-warning");
    this.form.addEventListener("submit", this._handleSubmit);
    const fileInput = document.getElementById("file");
    const infoElem = document.getElementById("field__file-info");
    const closeElem = document.getElementById("field__file-delete");
    new FileInput(fileInput, infoElem, closeElem);
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    this._unSetWrongField();
    const checkResult = this.validator.check();
    if (checkResult === true) {
      const data = new FormData(event.target);
      console.log(Array.from(data.entries()));
      return;
    }
    this._setWrongField(checkResult);
  };

  _setWrongField = (inp) => {
    inp.focus();
    inp.classList.add("wrong-input");
    const message = this._selectErrorMessage(inp.validity);
    console.log(message);
    inp.setCustomValidity(message);
    inp.reportValidity();
  };

  _unSetWrongField = () => {
    [...this.form.querySelectorAll("input")].forEach((inp) => {
      inp.classList.remove("wrong-input");
      inp.setCustomValidity("");
      inp.reportValidity();
    });
  };

  _selectErrorMessage = (validityState) => {
    console.log(validityState);
    let nameMessage;
    for (const key in validityState) {
      if (key === "valid") {
        continue;
      }
      if (validityState[key]) {
        console.log(key);
        nameMessage = key;
      }
    }
    return WARNINGS[nameMessage];
  };
}
