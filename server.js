const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
//const URL = "mongodb+srv://admin:admin123@cluster0.ftngj.mongodb.net?retryWrites=true&w=majority";
const URL = "mongodb://localhost:27017";

let usersList = [];
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/users", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("quicksand");
        let users = await db.collection("data").find({}).toArray();
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
        let db = connection.db("quicksand")

         // Select Collection
        // Do any Operation
        await db.collection("data").insertOne(req.body)

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