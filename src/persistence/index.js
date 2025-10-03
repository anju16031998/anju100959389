const express = require('express');
const app = express();

// --- 1. Database Initialization (TEMPORARILY DISABLED) ---

// This placeholder object will prevent the server from crashing on startup
// and allows the server to correctly respond to the health check.
let db = { 
    isBroken: true,
    query: () => { 
        console.error("Database functions are disabled for deployment testing.");
        return Promise.reject(new Error("Database disabled."));
    }
}; 
console.log("Database connection has been temporarily skipped/disabled.");


// --- 2. Express Server Setup ---
// Middleware to parse JSON requests
app.use(express.json());

// --- 3. Health Check / Root Route (CRITICAL FIX) ---
// This route now sends a guaranteed 200 OK response.
app.get('/', (req, res) => {
    
    if (db.isBroken) {
        // Send a 200 OK response, but inform that the DB is broken.
        // Returning a 200 OK is essential to pass the Cloud Run health check.
        return res.status(200).send('<h1>Server is ONLINE!</h1><p>Database connection temporarily disabled (HTTP 200 OK).</p>');
    }
    
    // This line would only run if the DB were connected
    res.status(200).send('<h1>Server is fully operational!</h1><p>Deployment successful.</p>');
});

// --- 4. Server Start (Port Listening) ---
const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => {
    console.log(`Server successfully started and listening on port ${PORT}`);
});