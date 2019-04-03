function Dom() {
    get = elem => {
        const el = document.querySelectorAll(elem);
        return (el.length === 1) ? el[0] : el;
    };

    setHTML = (elem, str) => {
        const el = document.querySelector(elem);
        if (el) el.innerHTML = str;
    };

    setAllHTML = (elem, str) => {
        const elements = document.querySelectorAll(elem);

        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = str;
            }
            return true
        } else {
            return false
        }
    };

    getHTML = elem => {
        const el = document.querySelector(elem);
        if (el) {
            return el.innerHTML;
        } else {
            return "";
        }
    };

    clearHtml = elem => {
        const el = document.querySelectorAll(elem);
        if (el.length === 1) {
            el[0].innerHTML = "";
            return true;
        } else {
            return false;
        }
    };

    clearAllHtml = (elem) => {
        const elements = document.querySelectorAll(elem);
        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = "";
            }
            return true
        } else {
            return false
        }
    };

    scriptHTML = src => {
        return `<script defer src="${src}"></script>`;
    };

    on = (event, ele, action) => {
        const elements = document.querySelectorAll(ele);
        elements.forEach(function (element) {
            element.addEventListener(event, action, false);
        });
    };

    return {
        get,
        setHTML,
        getHTML,
        clearHtml,
        clearAllHtml,
        scriptHTML,
        on,
        setAllHTML
    };
}

function actionModel(classGYA) {
    const gyaInstance = classGYA;

    binding = () => {
        const elements = document.querySelectorAll("[data-binding-with]");
        if (elements.length === 0) return;
        Object.keys(elements).map(function (key, index) {
            const el = elements[key];
            const triggerOn = el.dataset.bindingOn ? el.dataset.bindingOn : "keyup";
            el.addEventListener(triggerOn, () => {
                const el = event.target;
                const bindingWith = el.dataset.bindingWith;
                app.actionModel.setModel(bindingWith, el.value)
            });
        });
    };

    setModel = (modelKey, value) => {
        if (modelKey.indexOf(".") !== -1) {
            const k = modelKey.split(".");
            let modelBase = gyaInstance["model"]
            for (let i = 0; i < k.length - 1; i++) {
                modelBase = modelBase[k[i]]
            }
            modelBase[k[k.length - 1]] = value;
        } else {
            gyaInstance["model"][modelKey] = value;
        }

        gyaInstance.actionModel.setViewChanges(modelKey, value)
    };

    getModel = modelKey => {
        if (modelKey.indexOf(".") !== -1) {
            const k = modelKey.split(".");
            let modelBase = gyaInstance["model"]
            for (let i = 0; i < k.length - 1; i++) {
                modelBase = modelBase[k[i]]
            }
            return modelBase[k[k.length - 1]];
        } else {
            return gyaInstance["model"][modelKey];
        }
    };

    setViewChanges = (modelKey, value) => {
        ele = app.dom.get(`data-model[data-binding-with='${modelKey}']`)
        if (ele.length!==0){
            if (ele.length===1){
                ele.change()
            }else{
                ele.forEach((el)=>{
                    el.change()
                })
            }
        }
        
    }

    return {
        binding,
        setModel,
        getModel,
        setViewChanges
    };
}

function pageController(classGYA) {
    var gyaInstance = classGYA;
    const loadPage = data => {
        gyaInstance.pageController.getPage(
            `${data.folder}/template.hbs`,
            template => {
                const templateCompile = Handlebars.compile(template);
                const templateTemp = templateCompile({
                    data: data.data || {}
                });

                template = gyaInstance.pageController.templateConstruct({
                    templateTemp
                });
                gyaInstance.dom.setHTML(gyaInstance.app, template);

                let subDomain = "";
                if (gyaInstance.folder.length !== 0 ) {
                    subDomain = `${gyaInstance.folder}`;
                    data["folder"] = data.folder.replace(".","")
                } 

                gyaInstance.pageController.loadScripts(`${subDomain}${data.folder}/controller.js`);

                if (data.scripts) {
                    data.scripts
                        .forEach((element) => {
                            gyaInstance.pageController.loadScripts(element);
                        })
                }

                if (data.callBack) data.callBack();
            }
        );
    };

    const loadScripts = script => {
        const range = document.createRange();
        const src = gyaInstance.dom.scriptHTML(script);
        range.setStart(gyaInstance.dom.get(gyaInstance.app), 0);
        gyaInstance.dom
            .get(gyaInstance.app)
            .appendChild(range.createContextualFragment(src));
    };

    const getPage = (url, done) => {
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (response) {
                done(response);
            });
    };

    const getHbs = data => {
        $.get(data.url).done(template => {
            const templateCompile = Handlebars.compile(template);
            template = templateCompile({
                data: data.data || {}
            });
            if (data.callBack) data.callBack(template);
        });
    };

    const templateConstruct = data => {
        template = "";
        Object.keys(data).map(function (key, index) {
            template += data[key];
        });
        return template;
    };

    const initPagination = () => {
        //load not found
        gyaInstance.routers.pages.forEach(async (router) => {

            let directory = router.url ? router.dir : `${router.dir}/index.js`;
            directory = directory.indexOf(".js") === -1 ? `${directory}.js`: directory;

            await import(`${gyaInstance.folder}/src/page/${directory}`).then(src => {
                pageLoaded = src.default
                const url = router.url ? router.url : router.dir
                page(`${gyaInstance.folder}/${url}`, pageLoaded);
                if (gyaInstance.routers.default == router.url) {
                    page(`${gyaInstance.folder}/`, pageLoaded);
                }
            })
            page()
        })
    }

    return {
        loadPage,
        getHbs,
        templateConstruct,
        getPage,
        loadScripts,
        initPagination
    };
}

function GYA(data) {
    var gyaInstance = {};
    gyaInstance.today = new Date();

    gyaInstance.app = data.app;
    gyaInstance.folder = data.folder || "";
    gyaInstance.routers = data.routers;
    //to replace
    gyaInstance.model = (data && data.model) || {};
    gyaInstance.actions = (data && data.actions) || {};

    //methods
    gyaInstance.actionModel = new actionModel(gyaInstance);
    gyaInstance.dom = new Dom();

    //methosToPage
    gyaInstance.pageController = new pageController(gyaInstance);

    gyaInstance.pageController.initPagination();

    return gyaInstance;
}

Handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context);
});



///////////////////////////////////////////////
//*****************************************////
// html components                         ////
///////////////////////////////////////////////

class dataModel extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.change()
  }

  change(){
    const model = this.dataset.bindingWith;
    const modelValue = app.actionModel.getModel(model)
    this.shadow.innerHTML = modelValue;
  }
}

class Iteration extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const dataChild = this.children.length !== 0 ? this.children[0] : false;
        if (!dataChild) return;

        let dataToIterate = this.attributes.items.textContent;
        dataToIterate = eval(dataToIterate);
        const allAttr = this.children[0].attributes
        const nodeType = this.children[0].nodeName;
        const templateNode = this.children[0].cloneNode(true);

        for (let i = 0; i < dataToIterate.length; i++) {
            const item = dataToIterate[i];
            let strNode = templateNode.outerHTML

            if (typeof item!=="object"){
                const as = this.attributes.as ? this.attributes.as.textContent : "element"
                const find = `[${as}]`;
                strNode = this.replaceAll(strNode, find, dataToIterate[i]);
            } else {
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

class caseCondition extends HTMLElement {
    constructor() {
        super();
    }
}

class action extends HTMLElement {
    constructor() {
        super();
        const action = this.attributes["action"].textContent;
        const shadow = this.attachShadow({mode: 'open'});
        const result = eval(action) || null

        if (result) {
            if (typeof result === "string") {
                shadow.appendChild(document.createRange().createContextualFragment(result));
            }else{
                shadow.appendChild(result);
            }
        } 

    }
}



//exports
customElements.define('item-loop', Iteration);
customElements.define('data-model', dataModel);
customElements.define('if-condition', IfCondition);
customElements.define('select-condition', selectCondition);
customElements.define('case-condition', caseCondition);
customElements.define('call-action', action);

///////////////////////////////////////////////
// end html components                     ////
//*****************************************////
///////////////////////////////////////////////