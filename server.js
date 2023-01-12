const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
// const URL = "mongodb://localhost:27017";
const URL = "mongodb+srv://blessingaslan:blessing@cluster0.vbqughv.mongodb.net/?retryWrites=true&w=majority";

let usersList = [];
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/users", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("myLatest");
        let users = await db.collection("users").find({}).toArray();
        await connection.close();
        res.json(users);
    } catch (error) {
        console.log(error)
    }
    // res.json(usersList)
});

//Store the data's to the array from frontend
// app.post("/create-user", function (req, res) {
//     req.body.id = usersList.length + 1;
//     usersList.push(req.body);
//     res.json({message : "User Added"})

// });
app.post("/create-user", async function (req, res) {
    try {
        // Connect to the Database
        let connection = await mongoClient.connect(URL);

        // Select DB
        let db = connection.db("myLatest")

        // Select Collection
        // Do any Operation
        await db.collection("users").insertOne(req.body)

        // Close the connection
        await connection.close();

        res.json({
            message: "User Added"
        })
    } catch (error) {
        console.log(error)
    }
});

app.listen(process.env.PORT || 3000)