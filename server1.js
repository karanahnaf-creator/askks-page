const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Handle form payloads safely
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all static elements from /public folder automatically
app.use(express.static(path.join(__dirname, 'public')));

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, company, message } = req.body;

    if (!name || !email || !company || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Pipeline rejection: All form fields are strictly required.' 
        });
    }

    console.log('--- New Audit Review Initiated ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    return res.status(200).json({ 
        success: true, 
        message: 'Audit Review Initiated Successfully!' 
    });
});

// Fallback Route to serve your index1.html or index.html dynamically
app.get('*', (req, res) => {
    const index1Path = path.join(__dirname, 'public', 'index1.html');
    const indexPath = path.join(__dirname, 'public', 'index.html');

    if (fs.existsSync(index1Path)) {
        res.sendFile(index1Path);
    } else if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send(`
            <div style="font-family: monospace; padding: 40px; background: #0B0F19; color: #FF4D4D;">
                <h1>⚠️ Deployment Error</h1>
                <p>Express started, but neither <b>index1.html</b> nor <b>index.html</b> was found inside your <b>public</b> folder.</p>
            </div>
        `);
    }
});

// Start engine
app.listen(PORT, () => {
    console.log(`🚀 Engine active on port: ${PORT}`);
});
