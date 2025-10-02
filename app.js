const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Azure App Service Lab</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>🚀 Azure App Service + GitHub Lab</h1>
        <p>Version: 2.0 - MAJ auto</p>
        <p>Déployé automatiquement depuis GitHub !</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <hr>
        <h2>Endpoints disponibles:</h2>
        <ul style="list-style: none;">
          <li><a href="/health">📊 /health</a></li>
          <li><a href="/api/info">ℹ️ /api/info</a></li>
        </ul>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0'
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'webapp-lab',
    version: process.env.APP_VERSION || '1.0',
    platform: process.platform,
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
    customMessage: process.env.CUSTOM_MESSAGE || 'No custom message',
    azureRegion: process.env.REGION_NAME,
    instanceId: process.env.WEBSITE_INSTANCE_ID
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const appInsights = require('applicationinsights');
appInsights.setup();
appInsights.start();

// Compteur de visites
let visitCount = 0;

app.get('/', (req, res) => {
  visitCount++;

  // Télémétrie custom
  appInsights.defaultClient.trackEvent({
    name: 'PageView',
    properties: { page: 'home', version: process.env.APP_VERSION }
  });

  appInsights.defaultClient.trackMetric({
    name: 'VisitCount',
    value: visitCount
  });

  {
  "dependencies": {
    "express": "^4.18.2",
    "applicationinsights": "^2.7.0"
  }
}
});







