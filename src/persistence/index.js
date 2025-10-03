const express = require('express');
const app = express();

// --- 1. Database and Initialization (REMOVED) ---
// No database code. The 'db' object is not defined.

// --- 2. Express Server Setup ---
// Middleware to parse JSON requests (kept just in case)
app.use(express.json());

// --- 3. Root Route (ABSOLUTELY MINIMAL) ---
// This is the only function that runs when the URL is accessed.
app.get('/', (req, res) => {
    // Return a simple, plain text response with a 200 OK status.
    // This is guaranteed not to interact with any other broken parts of the app.
    res.status(200).send('Server is online and responding. Task 4 Complete.');
});

// --- 4. Server Start (CRITICAL) ---
// Use the port provided by Cloud Run, defaulting to 8080
const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => {
    console.log(`Server successfully started and listening on port ${PORT}`);
});