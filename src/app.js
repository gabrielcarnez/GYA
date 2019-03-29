const MyModel = {
    data: {
        hello: "hello",
        world: "world!",
        message: ""
    }
};

const myMethods = {
    concatMessage: data => {
        const dataMessage1 = app.actionModel.getModel("data.hello");
        const dataMessage2 = app.actionModel.getModel("data.world");

        strMessage = `${dataMessage1} ${dataMessage2}`;
        app.actionModel.setModel("data.message", strMessage);
        return strMessage;
    }
};

const myRouters = {
    default: "helloMundo",
    notFound: "notFound",
    pages: [
        {
            dir: "helloMundo/helloMundo.js",
            url: "helloMundo"
        }
    ]
};

const app = new GYA({
    app: "#content",
    folder:"/GYA",
    model: MyModel,
    actions: myMethods,
    routers: myRouters
});
