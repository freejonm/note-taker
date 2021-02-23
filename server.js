// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { resolve } = require('path');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using static pages
app.use(express.static('public'))


// reading db.json
fs.readFile('db/db.json', 'utf8', (err, data)=>{
    if (err) throw err;
    let notes = JSON.parse(data);

    // routing db.json to /api/notes
    app.get('/api/notes', (req, res) => res.json(notes));

    // route to add notes
    app.post('/api/notes', (req, res)=>{
        let newNote = req.body;
        notes.push(newNote);
        writeNotes();
        return res.json({});
    });

    function writeNotes(){
        fs.writeFile('db/db.json', JSON.stringify(notes), err =>{
            if (err) throw err;
            return true
        })};
})


// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


    


// Listener
app.listen(PORT, () => console.log(`server listening on ${PORT}`))

