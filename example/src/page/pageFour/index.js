const PageThree = () => {
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
            dates: ["13/05", "20/15", "15/08"]
        },
        callBack: () => {
            initPage();
        }
    });
};

const initPage = () => {
    console.log("the page four was init");
};

export default PageThree;
