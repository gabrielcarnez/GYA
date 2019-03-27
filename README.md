# GYA
GYA is a simple libray to contruct smalls single-page application, using as support Router.js and Handlebars.js.

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
## app.sj

To create a app with GYA you new create a new instance of GYA
const app = new GYA({
    app: "#content",
    model: MyModel,
    actions: myMethods,
    routers: myRouters
});

### params
app : the id to content your app
model: the data model for you app ( by default {})
actions: an object with functions that you think are necesary
routers: and object with the router of all pages of you app.

#### actions structure
The actions must be a object with simple funcions, for example
myMethods = {
    action1: () => alert("hey you!")
}

#### router structure
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
##### default
the page that you want init your app

##### notFount
the page for 404 error
##### subDirectory
if you app it is in a subfolder of your host, you need put it here (by default is empty)

##### pages
The page can be of two way posibles.
if the folder of your page contain the three basic files (pageName.js, controller.js,template.hbs) the router config should be
1 - router = {
    dir: an string with the router files of the page, for example: "pageOne/pageOne.js"
    url: an string that you want for the name of your url
}

if the folder of your page contain and index.js (index.js, controller.js,template.hbs) the router config should be
2- router = {
    dir: name of your page (pageOne)
}

### Construct a new page
To create a new page, you need create a folder inside page folder with the name of your new page and the three basic files (pagename.js, controller.js, template.hbs)

#### template.hbs
the template.hbs contain the html of your page

#### page.js
you need create an funcion with and export it as default.
inside the function you need call a GYA method called "app.pageController.loadPage" to init the page, for example.

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

#### app.pageController.loadPage(options)
This method should be caller each time that your create a new page, and the options can be.

- folder:the folder that contain your page, this props in obligatory
- scripts: an array with the string of external library (optional)
- data: an object with data to render in the template (optional)
- callback: if you want trigger some action alfer load the page, you can put it (optional)


### GYA dom metods
GYA give to you some mehods to manipulate the dom of your app.
If you want used some of this mehod, you need call app.dom.theMethodThatYouWantCall()

#### Methods
- get(elementIndetity): return an elemet or array of then, for example: 
    -  app.dom.get("p") return all p elementos of your app.
    -  app.dom.get(".name") return all elements with name class
    -  app.dom.get("#id") return one element with id equal to #id
- setHTML(elem, str): get first elem and set the str like content,
- setAllHTML: get all elems and set the str like content,
- getHTML(elem): find first elem and return the content like an string,
- clearHtml(ele): find first elem and emtpy the content,
- clearAllHtml(ele): find all elems and emtpy the content,
- on(event, ele, action): set a event(click,change etc) to the element (ele) with action (action should be a function),

