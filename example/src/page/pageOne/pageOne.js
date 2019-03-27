const Page_one = () => {
    app.pageController.loadPage({
        folder: "./src/page/pageOne",
        scripts: ["./lib/test-lib.js"],
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
