// Create a class for the element
class Iteration extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    const dataChild = this.children.length !== 0 ? this.children[0] : false;
    if (!dataChild) return;

    let dataToIterate = this.attributes.items.textContent;
    dataToIterate = eval(dataToIterate);

    //we need copy all attr
    const allAttr = this.children[0].attributes
    const nodeType = this.children[0].nodeName;
    const templateNode = this.children[0].cloneNode(true);

    for (let i = 0; i < dataToIterate.length; i++) {
        const item = dataToIterate[i];
        let strNode = templateNode.outerHTML
        console.log(1)
        if (typeof item!=="object"){
            const as = this.attributes.as ? this.attributes.as.textContent : "element"
            const find = `[${as}]`;
            strNode = this.replaceAll(strNode, find, dataToIterate[i]);
        }else{
            Object.keys(item).forEach((key)=>{
                const find = `[${key}]`;
                strNode = this.replaceAll(strNode, find, dataToIterate[i][key]);
            })    
        }


        shadow.appendChild(document.createRange().createContextualFragment(strNode));
    }
  }


  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    replaceAll(str, find, replace) {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }
}

// Define the new element
customElements.define('item-loop', Iteration);
