class RuleValidation {
  constructor(name, isValid) {
    this.name = name;
    this.isValid = isValid;
  }
}

export default class FormValidation {
  constructor(options) {
    this.dom = {};
    this.dom.body = document.body;
    this.dom.forms = document.querySelectorAll('[data-form-validation]');

    this.init();
    this.isFormValid = true;
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
          const isValidArr = this.fieldValidation(field, rules);
          const fieldParentEl = field.parentElement;
          this.isFormValid = isValidArr.every(r => r.isValid === true);
          isValidArr.forEach(r => this.handleRuleMessage(fieldParentEl, field, r));
        })
      });
    })
  }

  handleRuleMessage(fieldParentEl, field, rule) {
    const ruleMsg = field.getAttribute(`data-rule-${rule.name}-msg`);
    const ruleErrorEl = fieldParentEl.querySelector(`[data-error-${rule.name}]`);

    if (!rule.isValid) {
      if (!ruleErrorEl) {
        fieldParentEl.appendChild(this.createErrorMsg(rule.name, ruleMsg));
      }
      fieldParentEl.classList.remove('is-valid');
      fieldParentEl.classList.add('is-error');
    }

    if (rule.isValid) {
      if (ruleErrorEl) {
        ruleErrorEl.remove();
      }
      fieldParentEl.classList.remove('is-error');
      fieldParentEl.classList.add('is-valid');
    }
  }

  fieldValidation(field, rules) {
    return rules.map((rule) => {
      switch (rule) {
        case 'required':
          return new RuleValidation('required', this.isRequired(field));
        case 'email':
          return new RuleValidation('email', this.isEmail(field));
      }
    })
  }

  isRequired(field) {
    return field.value.length > 0;
  }

  isEmail(field) {
    const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRE.test(field.value);
  }
  
  createErrorMsg(rule, text) {
    const error = document.createElement('div');
    error.className = 'error-msg';
    error.textContent = text;
    error.setAttribute(`data-error-${rule}`, '');
    return error;
  }
}
