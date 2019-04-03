# GYA
GYA is a simple library to construct smalls single-page application, using as support [Router.js](https://github.com/tildeio/router.js)  and [Handlebars.js](https://handlebarsjs.com/).


### App structure


- index.html
- lib
    - GYA:js
    - Handlebars.js
    - page.js
    - another libraries that you want( jquery, boostrap etc )
- src
    - app.js
    - page
        - pageNameFolder
        - controller.js
        - pageName.js (or index.js)
        - template.hbs
## app.js

To create a app with GYA you new create a new instance of GYA
~~~~
const app = new GYA({
    app: "#content",
    model: MyModel,
    actions: myMethods,
    routers: myRouters,
});
~~~~
### GYA params
- app : the id to content your app<br>
- model (optional): the data model for you app ( by default {})<br>
- actions (optional): an object with functions that you think are necessary (by default {})<br>
- routers: an object with the router of all pages of you app.<br>
- folder (optional): if your app is inside in a folder, you should be spacifie the folder (by default it is empty) 

### Actions structure
The actions must be a object with simple functions, for example
~~~~
myMethods = {
    action1: () => alert("hey you!")
}
~~~~

And you can call this actions in any time of your app, just only: 

~~~~
app.actions.action1()
~~~~

### Router structure
The structure of the routers should be an object like:
~~~~
myRouters = {
    default: "pageOne",
    notFound: "notFound",
    subDirectory:"sab/test_gabi/GYAv2",
    pages: [
        {
            dir: "pageOne/pageOne.js",
            url: "pageOne"
        },
        {
            dir: "pageFour"
        }
    ]
}
~~~~

### Routers Params
- default: the page that you want init your app.
- notFount: the page for 404 error
- pages: an array of object, The object page can be of two way possible.

##### Pages Objects
If the folder of your page contain the three basic files (pageName.js, controller.js, template.hbs) the router config should be:<br/>
~~~~
page = {
    dir: an string with the router files of the page, for example: "pageOne/pageOne.js"
    url: an string that you want for the name of your url
}
~~~~

If the folder of your page contain and index.js (index.js, controller.js,template.hbs) the router configuration should be:<br/>
~~~~
page = {
    dir: name of your page (pageOne)
}
~~~~

### Construct a new page
To create a new page, you need create a folder inside page folder with the name of your new page and the three basic files (pagename.js, controller.js, template.hbs)

#### template.hbs
The template.hbs contain the html of your page

#### page.js
You need create an function with and export it as default.
inside the function you need call a GYA method called "app.pageController.loadPage" to init the page, for example.
~~~~
const My_page = () => {
    app.pageController.loadPage({
        folder: "./src/page/pageOne",
        scripts: ["./lib/test-lib.js"],
        data:{},
        callBack: () => {
            initPage();
        }
    });
};
export default My_page;
~~~~

#### app.pageController.loadPage(options)
This method should be caller each time that your create a new page, and the options can be.

- folder: the folder that contain your page, this props in obligatory
- scripts: an array with the string of external library (optional)
- data: an object with data to render in the template (optional)
- callback: if you want trigger some action alfer load the page, you can put it (optional)


### GYA dom methods
GYA give to you some methods to manipulate the dom of your app.
If you want used some of this method, you need call app.dom.theMethodThatYouWantCall()

#### Methods
- get(elementIndetity): return an element or array of then, for example: 
    -  app.dom.get("p") return all p elements of your app.
    -  app.dom.get(".name") return all elements with name class
    -  app.dom.get("#id") return one element with id equal to #id
- setHTML(elem, str): get first elem and set the str like content,
- setAllHTML: get all elems and set the str like content,
- getHTML(elem): find first elem and return the content like an string,
- clearHtml(ele): find first elem and emtpy the content,
- clearAllHtml(ele): find all elems and emtpy the content,
- on(event, ele, action): set a event(click,change etc) to the element (ele) with action (action should be a function).


### GYA Model methods

The model of your app it is a json object that contains all information of your page that you think are necessary save/work/process etc.

When you define the model, you can access and modify with the next methods

##### setModel(modelKey, value)
Set the value to a key of the model
~~~~
this.actionModel.setModel("person.name","carlos")
~~~~

##### getModel(modelKey)
return the value to a key of the model
~~~~
const personName = this.actionModel.setModel("person.name")
console.log(personName)
~~~~

### pageController
The pageController will you permitted load page of your app.

#### pageController
This method permitted to you init a new page

### GYA DOM elements

When you need operate adobe the dom, you can used any method of handlebars.js or you can used the next elements.

##### item-loop

The item-loop tag permitted to you iterate in any array of your app, for example:

###### Attributes:
- items: array to iterate.
- as: is used to define the position on the template (is only necessary if it is a simple array, not a object array).

~~~~
app.pageController.loadPage({
  folder: "./src/page/page",
  data: {
    dates: ["13/05", "20/15", "15/08"]
  }
});
~~~~

```html
<ul>
 <item-loop items="{{json data.dates}}" as="element">
    <li class="class">
        <p>[element]</p>
    </li>
 </item-loop>
</ul>
```

if the array is an a object array:

~~~~
const profiles = app.actionModel.getModel("data_4.profiles");

const items = profiles.map(p => {
    return {
        key: p.id,
        text: `${p.name} ${p.lastName}`
    };
});

app.pageController.loadPage({
    folder: "./src/page/pageFour",
    data: {
        items: items,
    },
});
~~~~

```html
<ul>
  <item-loop items="{{json data.items}}">
    <li class="class" id="[key]">
        <p>[text]</p>
        <a href="pageFive/[key]">editar</a>
    </li>
  </item-loop>
 </ul>
```

note: the fields should be in [field];

##### if-condition
If want make a conditional inside your html just only need
```html
<if-condition condition="{{data.a}} == 1">
   <p>Hola</p>
</if-condition>
```
if the attribute condition return true, the block is visible.


##### select-condition
If want make an case of conditionals just only need:
```html
    <select-condition compare-with={{data.a}}>
        <case-condition equalTo="1">
            <p>1</p>
        </case-condition>
        <case-condition equalTo="2">
            <p>2</p>
        </case-condition>
        <case-condition equalTo="3">
            <p>3</p>
        </case-condition>
    </select-condition>
```
###### Attributes:
- compare-with: the data that be compare
- equalTo: the data of this option

##### call-action
```html
<call-action action="app.actions.myaction()"></call-action>
```

Put the return of the action attributte inside the tag.
##### note: the action expect always a dom element or string.


#### Data binding:

If you want implement the two way data binding in your app or binding a input win a part of your model just only:

```html
<input 
    data-binding-with="data.data.key" 
    data-binding-on="change"
    value="" />
```

~~~~
const page() => {
    app.pageController.loadPage({
        folder: "./src/page/page
        callBack: () => {
            app.actionModel.binding();
        }
    });
};
~~~~

Every time that you create a page and need biding data, in the callback of your page your need init and make know GYA that need binding the model with the fields.

- data-binding-with: the key of your model.
- data-binding-on: the event that is trigger to save the new value in the key (keypress, change, keyup etc)

##### data-model
the element data-model it is used to show everytime a value of a model.
```html
    <data-model data-binding-with="data_2"></data-model>
```
data-binding-with: it is the key of your model.