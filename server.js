const express = require('express');
const app = express();
const path = require('path');

app.use(bodyParser.json());

// Route for submitting username
app.post('/submit-username', (req, res) => {
    const username = req.body.username;
    console.log(`Received username: ${username}`);
    // Handle the username data as needed (e.g., save to a database)
    res.sendStatus(200); // Send a success response to the client
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the first HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route for the second HTML page
app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'instructions.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.post('/submit-feedback', (req, res) => {
    const feedback = req.body.feedback;
    // Here you can save the feedback to a database or perform any other desired action
    res.send('Feedback received!');
});
