export class MaskExecutor {
  constructor(elem, dependCountry, dependsOrgType) {
    this.elem = elem;
    this.dependCountry = dependCountry;
    this.dependOrgType = dependsOrgType;
    this.state = {
      country: "ru",
      orgType: undefined,
    };
    this.mask = this._init();
  }
  _init = () => {
    this.dependCountry.addEventListener("change", this.onChange);
    this.dependOrgType.forEach((element) => {
      element.addEventListener("change", this.onChange);
    });
    let maskOptions = {
      mask: `00000000000000000000000000`,
      lazy: true,
    };

    return IMask(this.elem, maskOptions);
  };
  onChange = () => {
    if (this.dependCountry.value === "ru") {
      this.dependOrgType.forEach((element) => {
        if (element.checked && element.value === "INDIVIDUAL") {
          this.mask.updateOptions({
            mask: `000000000000`,
            lazy: false,
          });
        }
        if (element.checked && element.value === "LEGAL_ENTITY") {
          this.mask.updateOptions({
            mask: `0000000000`,
            lazy: false,
          });
        }
      });
    }
  };
}
