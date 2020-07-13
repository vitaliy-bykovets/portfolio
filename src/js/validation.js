export default class FormValidation {
  constructor(options) {
    this.dom = {};
    this.dom.body = document.body;
    this.dom.forms = document.querySelectorAll('[data-form-validation]');

    this.init();
  }
  
  init() {
    if (!this.dom.forms) return null;

    this.dom.forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const target = e.target;
        const fields = target.querySelectorAll('[data-rules]');

        fields.forEach((field) => {
          const rules = field.getAttribute('data-rules').split(',');
          this.fieldValidation(field, rules);
        })
      });
    })
  }

  fieldValidation(field, rules) {
    // switch () {
    //
    // }
  }

  isRequired(field) {
    return field.value.length > 0;
  }
}
