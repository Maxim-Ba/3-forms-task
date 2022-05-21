export class Spoiler {
  constructor(spoiler) {
    this.spoiler = spoiler;
    this.header = this.spoiler.querySelector(".spoiler__header");
    this.body = this.spoiler.querySelector(".spoiler__body");
    // this.header.addEventListener("click", this._handleClick);
  }
  // _handleClick = () => {
  //   this.body.classList.toggle("spoiler__body_close");
  // };
}
