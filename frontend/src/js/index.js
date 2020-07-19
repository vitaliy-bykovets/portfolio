import Conversion from './vendor/conversion.min';
import baguetteBox from 'baguettebox.js';
import Filters from './filters';
import FormValidation from './validation';

window.addEventListener('load', () => {
  const mainModule = new Main();
  const filters = new Filters();
  const contactFormValidation = new FormValidation('#contact-form');
  
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const formUrl = contactForm.getAttribute('data-form-action');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!contactFormValidation.isFormValid) {
        return null;
      }

      const data = {};

      for (let i = 0; i < contactForm.elements.length; i++) {
        if (contactForm.elements[i].name && contactForm.elements[i].value) {
          data[contactForm.elements[i].name] = contactForm.elements[i].value;
        }
      }

      const result = await postData(formUrl, data);
      console.log('********* - 31', result);
    });
  }

  mainModule.run();
});

async function postData(url = '', data = {}) {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

class Main {
  run() {
    baguetteBox.run('.gallery');
    this.setCopyright();
  }

  setCopyright() {
    const copyright = document.getElementById("copyright-year");
    if (copyright) {
      copyright.innerHTML = String(new Date().getFullYear());
    }
  }


}

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

