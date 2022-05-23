import { CustomSelect } from "./src/CustomSelect/index.js";
import { FormController } from "./src/FormController/index.js";
import { MultiSelect } from "./src/MultiSelect/index.js";
import { SteppedHeader } from "./src/SteppedHeader/index.js";
import { MaskExecutor } from "./src/utils/innMask.js";
import { phoneMask } from "./src/utils/phoneMask.js";
import { Validator } from "./src/Validator/index.js";
import OKVED_DATA from "./okved.json" assert { type: "json" };
import OKDP2_DATA from "./okpd.json" assert { type: "json" };

const tel = document.querySelector("#tel");
const inn = document.querySelector("#inn");
const phoneWithMask = phoneMask(tel);
const [steppedHeader] = document.getElementsByClassName("stepper-header");
const steppedHeaderInstance = new SteppedHeader(steppedHeader);

const forms = document.forms;
const fileInput = document.getElementById("file");
const infoElem = document.getElementById("field__file-info");
const closeElem = document.getElementById("field__file-delete");
const formController1 = new FormController(
  forms.reg1,
  Validator,
  fileInput,
  infoElem,
  closeElem,
  nextStep,
);
const logoFileInput = document.getElementById("logo");
const logoInfoElem = document.getElementById("field__logo-info");
const logoCloseElem = document.getElementById("field__logo-delete");
const formController2 = new FormController(
  forms.reg2,
  Validator,
  logoFileInput,
  logoInfoElem,
  logoCloseElem,
  nextStep,
);

const innElem = document.getElementById("inn");
const countrySelector = document.getElementById("country-selector");
const orgTypeElems = document.getElementsByName("org-type");
const innMask = new MaskExecutor(innElem, countrySelector, orgTypeElems);

const clickedElem = document.querySelector(".multiselect");
const list = document.querySelector(".multiselect__content-wrapper");
const spinner = document.querySelector(".multiselect__spinner");
const govFlag = document.getElementById("gov-flag");
const multiSelector = new MultiSelect(list, clickedElem, spinner, phoneWithMask, govFlag);

const selectorWrapper = document.getElementById("selector-wrapper-1");
const OKVEDSelector = new CustomSelect(OKVED_DATA, selectorWrapper);

const toStep3 = document.getElementById("to-next-step");

const stepCount = {
  count: 0,
};

showStep(stepCount.count);

const goBack = document.getElementById("back-to-1");
goBack.addEventListener("click", prevStep);
toStep3.addEventListener("click", nextStep);

function nextStep() {
  if (stepCount.count !== 2) {
    stepCount.count++;
    showStep(stepCount.count);
  }
}

function prevStep() {
  if (stepCount.count > 0) {
    stepCount.count--;
    showStep(stepCount.count);
  }
}

function showStep(step) {
  switch (step) {
    case 0:
      forms.reg1.classList.remove("display-none");
      forms.reg2.classList.add("display-none");
      steppedHeaderInstance.set(0);
      break;
    case 1:
      forms.reg1.classList.add("display-none");
      forms.reg2.classList.remove("display-none");
      steppedHeaderInstance.set(50);
      break;
    case 2:
      forms.reg1.classList.add("display-none");
      forms.reg2.classList.add("display-none");
      steppedHeaderInstance.set(100);
      break;
    default:
      break;
  }
}
