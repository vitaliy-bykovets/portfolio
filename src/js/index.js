import Conversion from './vendor/conversion.min';
import baguetteBox from 'baguettebox.js';

baguetteBox.run('.gallery');

window.addEventListener('load', () => {
  document.getElementById("copyright-year").innerHTML = String(new Date().getFullYear());
});

// init conversion.js
// var conversion = new Conversion({
//   delayContentInsert: true
// });
// conversion.init();
//
// // get elements for animations
// var transition = document.querySelector('.transition');
// var transitionAnimLayer = transition.querySelector('.transition-animation');
//
// // listen when click is executed
// conversion.on('click.executed', function() {
//   console.info('Conversion.js: click.executed');
//
//   // listen when animation is ended
//   var animationStart = function() {
//     transition.classList.remove('is-processing', 'is-enter');
//     transition.classList.add('is-stay');
//
//     // insert content when animation has been finished
//     setTimeout(function() {
//       conversion.emit('request.activate');
//     });
//
//     transitionAnimLayer.removeEventListener('animationend', animationStart)
//   };
//
//   transitionAnimLayer.addEventListener('animationend', animationStart);
//   transition.classList.add('is-processing', 'is-enter');
// });
//
// // listen when content is inserted
// conversion.on('content.inserted', function(newContent) {
//   document.getElementsByTagName('body')[0].classList = newContent.getElementsByTagName('body')[0].classList;
//   conversion.updateLinks();
//
//   var animationEnd = function() {
//     transition.classList.remove('is-processing', 'is-leave');
//     transition.classList.remove('is-stay');
//
//     transitionAnimLayer.removeEventListener('animationend', animationEnd)
//   };
//
//   transitionAnimLayer.addEventListener('animationend', animationEnd);
//   transition.classList.add('is-processing', 'is-leave');
// });

