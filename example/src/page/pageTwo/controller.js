app.dom.on("click", ".button_2", function() {
    const message = app.actionModel.getModel("data_2");
    app.dom.setHTML("#text", message);
});
