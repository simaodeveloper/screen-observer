import ScreenObserver from '../src/index.js';

const elementObserver = new ScreenObserver(document.querySelectorAll('.element'));

elementObserver.scroll((element, index) => {
  elementObserver.between([20, 40], (percentage) => {
    console.log(element, percentage);
  })

  elementObserver.start(80, (percentage) => {
    console.log(element, percentage);
  })
});
