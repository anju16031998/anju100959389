const express = require('express');
const app = express();

// --- 1. Database Initialization (Safe Implementation) ---

let db = null;
try {
    const initializeDb = () => {
        if (process.env.POSTGRES_HOST) {
            console.log("Attempting to use PostgreSQL.");
            // This requires either './postgres.js' or 'src/postgres.js' to exist
            return require('./postgres'); 
        } else {
            console.log("Attempting to use SQLite.");
            // This requires either './sqlite.js' or 'src/sqlite.js' to exist
            return require('./sqlite');
        }
    };
    
    db = initializeDb();
    
    // *** CRITICAL FIX: Check if the 'init' function exists before calling it ***
    if (db && typeof db.init === 'function') {
        db.init();
        console.log("Database init() function executed successfully.");
    } else {
        // This is where your previous error originated. The server will now continue.
        console.log("NOTE: Database module does not expose an 'init' function or it failed to load.");
    }

} catch (e) {
    console.error("CRITICAL: Database initialization failed during require() or connection!", e);
    // If initialization fails, set a broken object so the server can still start.
    db = { 
        isBroken: true, 
        query: () => { throw new Error("Database is not connected. Check Cloud Run logs for initialization error."); }
    }; 
}

// --- 2. Express Server Setup ---
app.use(express.json());

// --- 3. Health Check / Root Route ---
// This ensures the Cloud Run health check passes.
app.get('/', (req, res) => {
    if (db && db.isBroken) {
         // Respond with a 503 if the server started but the DB failed
         return res.status(503).send('Server is online, but Database connection failed. Check Cloud Run logs.');
    }
    // This is the default success message
    res.status(200).send('Server is online and running! Deployment successful.');
});

// --- 4. Server Start (CRITICAL) ---
// Use the port provided by Cloud Run, defaulting to 8080
const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => {
    console.log(`Server successfully started and listening on port ${PORT}`);
});