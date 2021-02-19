// dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Develop/public/notes.html')));

// Listener
app.listen(PORT, () => console.log(`server listening on ${PORT}`))
