const MyModel = {
    data: {
        hello: "hello",
        world: "world!",
        message: ""
    },
    data_2: "the second page data",
    data_3: {
        data: {
            key: 5
        }
    },
    data_4: {
        profiles: [
            {
                id: 1,
                name: "Juan",
                lastName: "Salat"
            },
            {
                id: 2,
                name: "Pablo",
                lastName: "Fito"
            },
            {
                id: 3,
                name: "Carlos",
                lastName: "Menem"
            },
            {
                id: 4,
                name: "Samit",
                lastName: "gia"
            }
        ],
        favorites: []
    }
};

const myMethods = {
    concatMessage: data => {
        var dataMessage1 = app.actionModel.getModel("data.hello");
        var dataMessage2 = app.actionModel.getModel("data.world");

        strMessage = `${dataMessage1} ${dataMessage2}`;
        app.actionModel.setModel("data.message", strMessage);
        return strMessage;
    }
};

const myRouters = {
    default: "pageOne",
    notFound: "notFound",
    pages: [
        {
            dir: "pageOne/pageOne.js",
            url: "pageOne"
        },
        {
            dir: "pageTwo/pageTwo.js",
            url: "pageTwo"
        },
        {
            dir: "pageThree/pageThree.js",
            url: "pageThree"
        },
        {
            dir: "pageFour"
        },
        {
            dir: "pageFive/pageFive.js",
            url: "pageFive/:id"
        }
    ]
};

const app = new GYA({
    app: "#content",
    folder:"/GYA/example",
    model: MyModel,
    actions: myMethods,
    routers: myRouters
});

app.pageController.getPage("./src/page/menu/menu.html", page => {
    app.dom.setHTML("#menu", page);
});
