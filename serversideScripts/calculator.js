exports.calculate = function(app) {
    app.post("/calculate", function(req, res) {
        
        let oper = req.body.operation, num,
            num1 = Number(req.body.num1),
            num2 = Number(req.body.num2);
        
        switch(oper) {
            case "add":
                num = num1 + num2;
                break;
            case "sub":
                num = num1 - num2;
                break;
            case "mul":
                num = num1 * num2;
                break;
            case "div":
                num = num1 / num2;
                break;
        }

        const page = {"page": "calculator.ejs", "answer": num};
        res.render("templates/pageTemplate", page);
        //res.redirect("/test");
    });
}