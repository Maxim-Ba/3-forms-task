import { FormController } from "./src/FormController/index.js";
import { MultiSelect } from "./src/MultiSelect/index.js";
import { Spoiler } from "./src/Spoiler/index.js";
import { SteppedHeader } from "./src/SteppedHeader/index.js";
import { phoneMask } from "./src/utils/phoneMask.js";
import { Validator } from "./src/Validator/index.js";

const tel = document.querySelector("#tel");
const phoneWithMask = phoneMask(tel);
const [steppedHeader] = document.getElementsByClassName("stepper-header");
const steppedHeaderInstance = new SteppedHeader(steppedHeader);

const [form] = document.forms;

const formController = new FormController(form, Validator);

const clickedElem = document.querySelector(".multiselect");
const list = document.querySelector(".multiselect__content-wrapper");
const spinner = document.querySelector(".multiselect__spinner");
const govFlag = document.getElementById("gov-flag");
const multiSelector = new MultiSelect(list, clickedElem, spinner, phoneWithMask, govFlag);

const spoilers = document.querySelectorAll(".spoiler");
spoilers.forEach((sp) => {
  new Spoiler(sp);
});
