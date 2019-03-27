// Create a class for the element
class dataModel extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.shadow = this.attachShadow({mode: 'open'});
    this.change()
  }

  change(){
    const model = this.dataset.bindingWith;
    const modelValue = app.actionModel.getModel(model)
    this.shadow.innerHTML = modelValue;
  }
}

// Define the new element
customElements.define('data-model', dataModel);
