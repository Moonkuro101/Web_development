import express from 'express';
import bodyParser from 'body-parser';
import jsonData from './recipe.json' assert { type: 'json' };

let data;
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// GET request for the home page
app.get('/', (req, res) => {
    res.render('index.ejs', { recipe: data });
});

// POST request to handle recipe selection
app.post('/recipe', (req, res) => {
    switch (req.body.choice) {
        case 'chicken':
            data = jsonData[0]; // Access the first recipe
            break;
        case 'beef':
            data = jsonData[1]; // Access the second recipe
            break;
        case 'fish':
            data = jsonData[2]; // Access the third recipe
            break;
        default:
            data = null; // Handle default case
            break;
    }
    res.redirect('/'); // Redirect to the home page
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
