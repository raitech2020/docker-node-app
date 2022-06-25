const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Item = require("./models/Item")

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

// const url = "mongodb://127.0.0.1:27017/docker-node-mongo"
const url = "mongodb://mongo:27017/docker-node-mongo"

mongoose
    .connect(url)
    .then(() => console.log(`Connected to mongodb at ${url}`))
    .catch(err => console.log(err))

app.get("/ping", (req, res) => {
    res.json({
        status: "I am alive"
    })
})

app.get("/", (req, res) => {
    Item
        .find()
        .then(items => res.render("index", {items: items}))
        .catch(err => res.status(404).json({
            msg: "No items found"
        }))
})

app.post("/item/add", (req, res) => {
    const name = req.body.name
    const newItem = new Item({
        name: name
    })
    newItem
        .save()
        .then(item => {
            res.redirect("/")
        })
        .catch(err => console.error(err))
})

const port = 3000

app.listen(port, () => {
    console.log(`Express Server running at ${port} ...`)
})
