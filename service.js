const express = require('express');

const Persist = require("./persist.js");

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/stat', (req, res) => {
    res.send("OK");
});

app.post('/saveData', (req, res) => {
    Persist.save(req.body);
    res.send("OK");
});

app.get('/readData/:id', async (req, res) => {
    const id = req.params.id;
    Persist.read(id, function(data) {
        return res.status(200).send(data);
    });
});

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT + "...");
});
