app.dom.on("click", ".agregar", function() {
    const favourites = app.actionModel.getModel("data_4.favorites");
    favourites.push(this.dataset.id);
    app.actionModel.setModel("data_4.favorites", favourites);
    app.dom.setHTML("[data-is-favourite]", "&#9733;");
});
