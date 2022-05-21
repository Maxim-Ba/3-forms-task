import { BACKGROUND, COMPLETE_LINE } from "./constants.js";

export class SteppedHeader {
  constructor(element)  {
    this.element = element;
    this.steppedLine = document.createElement('div');
    this.steppedLine.className = "stepper-line"
    this.element.appendChild(this.steppedLine)
    this.DotsNodes = this.element.getElementsByClassName('stepper-point') 
    this.partOfComplite = 0;
    this.set(0)
  }
  set=(procent)=>{
    this.partOfComplite = procent;
    this._fill();
    this._fillDots()
  }
  _fill=()=>{
    this.steppedLine.style.background = `linear-gradient(to right , ${COMPLETE_LINE} ${this.partOfComplite}% , ${BACKGROUND} ${this.partOfComplite}%)`
  }
  _fillDots=()=>{

    [...this.DotsNodes].forEach((dot,index)=>{

      if (index>0) {
        if (this.partOfComplite >=50 && index === Math.floor((this.DotsNodes.length-1)/2)) {
          dot.classList.add('complete');
       }
        if (this.partOfComplite >=100 && index === this.DotsNodes.length-1) {
          dot.classList.add('complete');
        }
      }
     
    })
  }
}