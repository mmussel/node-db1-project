const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/accounts", (req, res) => {
    db.select("*")
    .from("accounts")
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error retrieving accounts" });
    })
});

server.get("/accounts/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
        if (account) {
            res.status(200).json({ data: account })
        } else {
            res.status(404).json({ error: "id not found" })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message })
    })
});

server.post("/accounts/:id", (req, res) => {
    db("accounts")
    .insert(req.body)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(error => {
        res.status(500).json({ error: error.message })
    })
});

server.put("accounts/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count) {
            res.status(200).json({ updated: count })
        } else {
            res.status(404).json({ message: "account not found" })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json( { error: error.message })
    })
});

server.delete("/accounts/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(account => {
        if (account) {
            res.status(200).json({ data: account })
        } else {
            res.status(500).json({ error: error.message })
        }
    });
})


module.exports = server;