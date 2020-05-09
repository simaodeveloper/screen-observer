import { _isType, _toArray } from './utils.js';

export default class ScreenObserver {
  constructor(elements) {
    this.listeners = [];
    this.elements = _toArray(elements);
    this.rectBounds = [];
    this.currentIndex = null;
    this.minPercentage = 0;
    this.maxPercentage = 100;

    this.loadEvents();
  }

  loadEvents() {
    window.addEventListener('scroll', () => {
      if (this.listeners.length > 0) {
        // if element is on screen dispatch scroll event
        this.elements.forEach((element, index) => {
          this.rectBounds[index] = element.getBoundingClientRect();
          this.currentIndex = index;
          this.listeners.forEach(fn => fn.apply(element, [element, index]));
        })
      }
    });
  }

  fetchRectBounds() {
    return this.rectBounds[this.currentIndex];
  }

  currentPercentage() {
    const { height, top } = this.fetchRectBounds();
    return Math.round(((-top)*100) / height);
  }

  calculate(fn) {
    if (_isType(this.currentIndex, 'number')) {
      const percentage = this.currentPercentage()
      fn(percentage);
    }
  }

  between(percentageRange, fn) {
    this.calculate(percentage => {
      const [minPercentage, maxPercentage] = percentageRange;

      if (
        percentage >= minPercentage &&
        percentage <= maxPercentage
      ) {
        fn(percentage);
      }
    });
  }

  start(minPercentage, fn) {
    this.calculate(percentage => {
      if (
        percentage >= minPercentage &&
        percentage <= this.maxPercentage
      ) {
        fn(percentage);
      }
    })
  }

  end(maxPercentage, fn) {
    this.calculate(percentage => {
      if (
        percentage <= this.minPercentage &&
        percentage >= maxPercentage
        ) {
        fn(percentage);
      }
    })
  }

  scroll(fn) {
    this.listeners.push(fn);
  }


}
