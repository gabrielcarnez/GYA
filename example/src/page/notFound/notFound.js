const NotFound = () => {
    app.pageController.loadPage({
        folder: "./src/page/notFound",
        callBack: () => {
            initPage();
        }
    });
};

const initPage = () => {
    console.log("Page not found");
};

export default NotFound;
