const PageTwo = () => {
    app.pageController.loadPage({
        folder: "./src/page/pageTwo",
        callBack: () => {
            app.actionModel.binding();
            initPage();
        }
    });
};

const initPage = () => {
    console.log("the page two was init");
};

export default PageTwo;
