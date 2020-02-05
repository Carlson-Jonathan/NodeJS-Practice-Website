/*********************************************************************
 * This connects Repl to cloud.mongodb.com (Atlas) database system 
 * online. You must first establish a user account on their webpage.
 * Create a database, a collection, and a user/password with access.
 * A lot of things in this page are commented out simply to avoid 
 * spamming the online database 
*********************************************************************/
exports.startDB = function(app) {

    const mongoose = require("mongoose");

    // Note: You must manually enter your password and database name
    // The 2nd and 3rd parameters are to prevent warning message spam
    mongoose.connect("mongodb+srv://bumperpants:Carlson3712@cluster0-r8m3l.mongodb.net/myFirstMongo", { useNewUrlParser: true, useUnifiedTopology: true});

    // Confirm connection has been established (optional)
    mongoose.connection.once('open', function() {
        console.log("Connection to database has been established!");
    }).on('error', function() {
        console.log("Connection failed..."); 
    });



    /****************************************************************
     * Setting up tables and inserting them into the database.
    ****************************************************************/
    // Create a table template (class)
    const someSchemaName = new mongoose.Schema({
        name: String,
        age: Number,
        description: String
    });

    const newSchema = new mongoose.Schema({
        name: String,
        age: Number,
        weapon: String
    });

    const make = [
        {name: "Captain America", age: 33, weapon: "shield"},
        {name: "Iron Man", age: 44, weapon: "suit"},
        {name: "Thor", age: 5000, weapon: "Awesomeness"}
    ];

    // Create an object through mongoose
    const Person = mongoose.model("Person", someSchemaName);
    const Avenger = mongoose.model("Avenger", newSchema);

    // Set your object attributes
    // const me = new Person({
    //     name: "Jonny",
    //     age: 39,
    //     description: "handsome"
    // });

    // const honey = new Person({
    //     name: "Shannon",
    //     age: 37,
    //     description: "gorgeous"
    // });

    // const kitty = new Person({
    //     name: "Lupen",
    //     age: 1,
    //     description: "Kitties are people too!"
    // });

    // Save your object to your database individually or as a group:
    // me.save(); honey.save(); kitty.save();

    // const arrayOfPeople = [me, honey, kitty];
    // Avenger.insertMany(make, function(err) {
    //     if(err)
    //         console.log(err);
    //     else
    //         console.log("Items inserted successfully!");
    // });

    // Person.insertMany(arrayOfPeople, function(err) {
    //     if(err)
    //         console.log(err);
    //     else
    //         console.log("Items inserted successfully!");
    // });

    

    /****************************************************************
     * Fetching and updating table information.
     * Mongoose automatically converts a singular class name to its
     * plural. This will fetch all of the content of the "people" 
     * table. 
    ****************************************************************/
    // the Mongo version of a "SELECT * FROM People" statement.
    Person.find(function(err, people) {
        if(err)
            console.log("An error occurred when finding your table " + err);

        // Display a single attribute of a specific table item:
        // console.log(kitty.description);

        // Call a specific attribute for all items in your table:
        // people.forEach(function(person) {
        //     console.log(person.name);
        // });

        // Update an attribute:
        // Person.updateOne({name: "Jonny"}, {description: "Super-human!"}, function(err) {
        //     if(err)
        //         console.log("Error updating a single item. " + err);
        // });

        // Remove an item from the table
        // Person.deleteOne({name: "Thor"}, function(err) { 
        //     if(err)
        //         console.log("Error removing item. " + err)
        // });

        // View the results of your changes:
        // console.log(people);
        
        // Housekeeping. Close the fridge when you got what you want. Once this function is called, no additional changes may be made to the database.
        // mongoose.connection.close();
    });



    /****************************************************************
     * Actually using your data in a page.
     * When a page is called that uses the database, the database 
     * variables should be set in the ".get" function and passed to
     * the page as parameters.
    ****************************************************************/
    app.get("/database", function(req, res) {
        Avenger.find(function(err, avengers) {
            if(err)
                console.log("An error occurred when finding your table " + err);
            
            const parameters = 
            {"page": "MongoDB.ejs", "people": avengers};

            res.render("templates/pageTemplate", parameters);
        });
    });

    app.post("/database", function(req, res) {
        const newHero = new Avenger({
            name: req.body.name,
            age: req.body.age,
            weapon: req.body.weapon
        }); 
        newHero.save();
        res.redirect("/database");
    });

    app.get("/deleteDatabaseItem", function(req, res) {
        Avenger.deleteOne({name: req.query.deleteMe}, function(err) { 
            if(err)
                console.log("Error removing item. " + err)
        });
        res.redirect("/database");
    });
}