app.dom.on("click", ".button_3", function() {
    const message = app.actionModel.getModel("data_3.data.key");
    app.dom.setHTML("#text", message);
});
