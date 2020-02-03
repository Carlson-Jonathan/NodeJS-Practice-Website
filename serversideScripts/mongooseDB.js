/*********************************************************************
 * This connects Repl to cloud.mongodb.com (Atlas) database system 
 * online. You must first establish a user account on their webpage.
 * Create a database, a collection, and a user/password with access.
*********************************************************************/
exports.startDB = function() {

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

    // Create a class (schema) template for your data (a table item)
    const someSchemaName = new mongoose.Schema({
        name: String,
        age: Number,
        description: String
    });

    // Create an object through mongoose
    const Person = mongoose.model("Person", someSchemaName);

    // Set your object attributes
    const me = new Person({
        name: "Jonny",
        age: 39,
        description: "handsome"
    });

    const honey = new Person({
        name: "Shannon",
        age: 37,
        description: "gorgeous"
    });

    const kitty = new Person({
        name: "Lupen",
        age: 1,
        description: "Kitties are people too!"
    });

    // Save your object to your database individually or as a group:
    // me.save(); honey.save(); kitty.save();
    const arrayOfPeople = [me, honey, kitty];

    Person.insertMany(arrayOfPeople, function(err) {
        if(err)
            console.log(err);
        else
            console.log("Items inserted successfully!");
    });

    // Mongoose automatically converts a singular class name to its plural.
    Person.find(function(err, people) {
        if(err)
            console.log(err);
        else
            console.log(people);
    })
    // console.log(Person.find( { arrayOfPeople: { $age: 39 } } ));
}