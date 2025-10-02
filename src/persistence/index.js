const express = require('express');
const app = express();

// --- 1. Database Initialization (Using your logic) ---

// Assuming your database selector logic is in a file like 'db.js' or similar,
// which is then imported by index.js to use the DB connection object.
// We'll put your logic into a simple selector function for clarity.

// NOTE: Ensure your './postgres' and './sqlite' files export a usable DB object
const initializeDb = () => {
    if (process.env.POSTGRES_HOST) {
        console.log("Using PostgreSQL connection.");
        // This line assumes you have a file named 'postgres.js' in the same directory (src)
        return require('./postgres'); 
    } else {
        console.log("Using SQLite connection.");
        // This line assumes you have a file named 'sqlite.js' in the same directory (src)
        return require('./sqlite');
    }
};

const db = initializeDb();
// You can now use 'db' throughout your application for database operations.

// --- 2. Express Configuration ---

// Middleware to parse JSON requests
app.use(express.json());

// --- 3. Example Route (Adjust as needed) ---

app.get('/', (req, res) => {
    // This is just an example. You would query the 'db' object here.
    res.status(200).send('Hello from the Node.js Cloud Run container!');
});

// --- 4. Server Start (The CRITICAL part for Cloud Run) ---

// Cloud Run injects the listening port via the environment variable PORT.
// We use process.env.PORT, defaulting to 8080, which matches your Dockerfile's configuration.
const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => {
    console.log(`Server successfully started and listening on port ${PORT}`);
});