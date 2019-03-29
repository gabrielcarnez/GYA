class IfCondition extends HTMLElement {
    constructor() {
        super();
        const condition = this.attributes.condition.textContent
        
        try {
            if (!(eval(condition))){
                 this.remove()
            }
        }
        catch(error) {
          this.remove()
        }

    }
}
//exports
customElements.define('if-condition', IfCondition);


class selectCondition extends HTMLElement {
    constructor() {
        super();
        const compareWith = this.attributes["compare-with"].textContent
        const selects = this.querySelectorAll(`case-condition:not([equalTo="${compareWith}"])`)
  
        selects.forEach((el)=>{
            el.remove()
        })
    }
}
//exports
customElements.define('select-condition', selectCondition);

class caseCondition extends HTMLElement {
    constructor() {
        super();
    }
}
//exports
customElements.define('case-condition', caseCondition);


























