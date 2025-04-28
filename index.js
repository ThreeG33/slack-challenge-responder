const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Replace this with your real Zapier Webhook URL
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/21874959/2p475dm/';

app.post('/', async (req, res) => {
  if (req.body.type === 'url_verification') {
    return res.send(req.body.challenge);
  }

  // Forward all other event payloads to Zapier
  try {
    await axios.post(ZAPIER_WEBHOOK_URL, req.body);
    console.log('Event forwarded to Zapier');
  } catch (error) {
    console.error('Error forwarding to Zapier:', error);
  }

  res.status(200).send('ok');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Slack Responder running on port ${port}`);
});
