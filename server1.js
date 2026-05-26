const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads from your contact form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Serve all static files (CSS, JS, Images) from the public folder automatically
app.use(express.static(path.join(__dirname, 'public')));

/**
 * API Contact Endpoint
 * Handles your Alpine.js contact form submissions
 */
app.post('/api/contact', (req, res) => {
    const { name, email, company, message } = req.body;

    // Simple validation check
    if (!name || !email || !company || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Pipeline rejection: All form fields are strictly required.' 
        });
    }

    console.log('--- New Audit Review Initiated ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Company/Revenue: ${company}`);
    console.log(`Bottleneck: ${message}`);
    console.log('----------------------------------');

    // Respond back to your Alpine frontend
    return res.status(200).json({ 
        success: true, 
        message: 'Audit Review Initiated Successfully!' 
    });
});

/**
 * Bulletproof Fallback Route Handler
 * Gracefully attempts to locate index1.html OR index.html inside /public
 */
app.get('*', (req, res) => {
    const index1Path = path.join(__dirname, 'public', 'index1.html');
    const indexPath = path.join(__dirname, 'public', 'index.html');

    if (fs.existsSync(index1Path)) {
        // Fallback option A: Found index1.html
        res.sendFile(index1Path);
    } else if (fs.existsSync(indexPath)) {
        // Fallback option B: Found index.html instead
        res.sendFile(indexPath);
    } else {
        // Catch-all failure: Both files are missing or the folder layout is broken on GitHub
        res.status(404).send(`
            <div style="font-family: monospace; padding: 40px; background: #0B0F19; color: #FF4D4D; line-height: 1.6;">
                <h1 style="color: #FF9F1C;">⚠️ Deployment Architecture Error</h1>
                <p><strong>Reason:</strong> ENOENT (No such file or directory)</p>
                <p>Express successfully started, but neither <code>index1.html</code> nor <code>index.html</code> could be found inside your <code>public</code> directory on Render.</p>
                <hr style="border: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
                <p style="color: #888;"><strong>Current Directory Traversal State:</strong></p>
                <ul>
                    <li>Root Path: <code>${__dirname}</code></li>
                    <li>Expected Public Folder: <code>${path.join(__dirname, 'public')}</code></li>
                </ul>
                <p style="color: #fff;">Please make sure your folder name on GitHub is completely lowercase <b>"public"</b> and contains your HTML file.</p>
            </div>
        `);
    }
});

// Start the server infrastructure
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 ASKKS Core Engine Active on Port: ${PORT}`);
    console.log(`=================================================`);
});
