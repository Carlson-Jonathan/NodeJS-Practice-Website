exports.wrapper1 = function(app) {
    app.get("/", function(req, res) {
        const page = {"page": "homepage.ejs"};
        res.render("templates/pageTemplate", page);
    });

    // Pulls in the "/calculator" url functions
    const calculator = 
        require(__dirname + "/calculator.js");
    calculator.calculate(app);

    app.get("/test", function(req, res) {
        const page = {"page": "test.ejs"};
        res.render("templates/pageTemplate", page);
    });

    app.get("/accounts", function(req, res) {
        const page = {"page": "userAccounts.ejs"};
        res.render("templates/pageTemplate", page);
    });
}

