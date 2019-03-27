const PageFive = ctx => {
    const profiles = app.actionModel.getModel("data_4.profiles");
    const profile = profiles.find((p, index) => p.id == ctx.params.id);
    const index = profiles.findIndex((p, index) => p.id == ctx.params.id);
    app.pageController.loadPage({
        folder: "./src/page/pageFive",
        data: {
            profile: {
                ...profile,
                index: index
            }
        },
        callBack: () => {
            app.actionModel.binding();
            initPage();
        }
    });
};

const initPage = () => {
    console.log("the page two was init");
};

export default PageFive;
