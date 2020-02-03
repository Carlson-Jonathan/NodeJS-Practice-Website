exports.wrapper1 = function(app) {
    app.get("/", function(req, res) {
        const page = {"page": "homepage.ejs"};
        res.render("templates/pageTemplate", page);
    });

    app.get("/calculator", function(req, res) {
        const page = {"page": "calculator.ejs", "answer": 0};
        res.render("templates/pageTemplate", page);
    });
    
    const calculator = 
        require(__dirname + "/calculator.js");
    calculator.calculate(app);

    app.get("/test", function(req, res) {
        const page = {"page": "test.ejs"};
        res.render("templates/pageTemplate", page);
    });
}

