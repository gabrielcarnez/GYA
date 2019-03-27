app.dom.on("click", ".button_1", function() {
    let message = app.actionModel.getModel("data.message");

    message = message.split("");
    message = message.reverse();
    message = message.join("");

    app.actionModel.setModel("data.message", message);
    app.dom.setHTML("#text", message);
});
