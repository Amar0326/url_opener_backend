const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let urlLists = {}; // In-memory storage (use a database for persistence)

app.post('/save', (req, res) => {
    const { id, urls } = req.body;
    if (!id || !urls || !Array.isArray(urls)) {
        return res.status(400).send({ error: 'Invalid data' });
    }
    urlLists[id] = urls;
    res.send({ success: true });
});

app.get('/list/:id', (req, res) => {
    const id = req.params.id;
    if (!urlLists[id]) {
        return res.status(404).send({ error: 'List not found' });
    }
    res.send({ urls: urlLists[id] });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
