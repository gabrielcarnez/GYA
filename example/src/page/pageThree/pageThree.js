const PageThree = () => {
    app.pageController.loadPage({
        folder: "./src/page/pageThree",
        callBack: () => {
            app.actionModel.binding();
            initPage();
        }
    });
};

const initPage = () => {
    console.log("the page two was init");
};

export default PageThree;
