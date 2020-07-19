

export default class Filters {
  constructor(options) {
    this.dom = {};
    this.dom.body = document.body;
    this.dom.toggles = document.querySelectorAll('[data-toggle]');
    this.dom.sections = document.querySelectorAll('[data-filter]');

    this.init();
  }
  
  init() {
    if (!this.dom.toggles) return null;

    this.dom.toggles.forEach((item) => {
      item.addEventListener('change', e => this.toggleChanged(e));
    })
  }

  toggleChanged(e) {
    e.preventDefault();
    const dataToggle = e.target.getAttribute('data-toggle');
    Array.from(this.dom.sections).find((item, index) => {
      const dataSection = item.getAttribute('data-filter');

      if (dataToggle === 'all') {
        this.dom.sections[index].classList.remove('is-hide');
        return null;
      }

      if (dataToggle === dataSection) {
        this.dom.sections[index].classList.remove('is-hide');
      } else {
        this.dom.sections[index].classList.add('is-hide');
      }
    })
  }
}
