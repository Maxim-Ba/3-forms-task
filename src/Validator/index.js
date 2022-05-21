export class Validator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;
    this.inputs = this.form.querySelectorAll("input");
    this._init();
  }
  _init = () => {
    this.inputs.forEach((input) => {
      if (input.name === "password") {
        this.passwordInp = input;
      }
      if (input.name === "repeat-password") {
        this.repeatPasswordInp = input;
      }
      const rules = this.rules.find((rule) => rule.name === input.name);
      if (rules) {
        Object.entries(rules.rule).forEach(([key, value]) => {
          input.setAttribute(key, value);
        });
      }
    });
  };
  passwordCheck = () /*:true | elementNode*/ => {
    return this.passwordInp.value === this.repeatPasswordInp.value || this.passwordInp;
  };
  check = () /*:true | elementNode*/ => {
    const isValid = this.form.checkValidity();
    if (isValid) {
      return true;
    }
    const wrongInput = [...this.inputs].find((inp) => {
      if (inp === this.passwordInp && inp.validity.valid) {
        console.log(inp.validity);
        const passwordResult = this.passwordCheck();
        if (passwordResult !== true) {
          inp.validity.passWrong = true;
          return true;
        } else {
          inp.validity.passWrong = false;
        }
      }
      return !inp.validity.valid;
    });

    return wrongInput;
  };
}
