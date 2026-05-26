const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configurations for processing incoming data streams
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets directly from the public folder
app.use(express.static(path.join(__dirname, 'public')));

/**
 * API Route: Pipeline Capture Controller
 * Processes contact submissions and leads seamlessly.
 */
app.post('/api/contact', (req, res) => {
    const { name, email, company, message } = req.body;

    // Structural telemetry checks
    if (!name || !email || !company || !message) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing parameters. Structural funnel parameters rejected." 
        });
    }

    // Server log verification tracking
    console.log(`\n--- NEW LEAD ROUTED INTO SYSTEM ---`);
    console.log(`Lead Name: ${name}`);
    console.log(`Email Source: ${email}`);
    console.log(`Target Venture: ${company}`);
    console.log(`Reported Bottleneck: ${message}`);
    console.log(`------------------------------------\n`);

    return res.status(200).json({
        success: true,
        message: `Transmission accepted, ${name}. Your pipeline audit record has cleared verification rules.`
    });
});

/**
 * Fallback entry point routing (EXPRESS v5 APPROVED CATCH-ALL)
 * Express v5 requires an explicitly named wildcard parameter. 
 * Using '/{*splat}' captures the root '/' and any sub-routes smoothly.
 */
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});

// Fire up the local engine
app.listen(PORT, () => {
    console.log(`[ASKKS System Engine]: Online and parsing scale streams via port ${PORT}`);
});