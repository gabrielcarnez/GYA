const Page_one = () => {
    app.pageController.loadPage({
        folder: "./src/page/helloMundo",
        scripts: ["./lib/test-lib.js"],
        data:{
        	a:2
        },
        callBack: () => {
            initPage();
        }
    });
};

const initPage = () => {
    const message = app.actions.concatMessage();
    app.dom.setHTML("#text", message);
};

export default Page_one;
