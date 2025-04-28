const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/your-real-zap-id/'; // replace with yours

app.post('/', async (req, res) => {
  if (req.body.type === 'url_verification') {
    return res.send(req.body.challenge);
  }

  try {
    await axios.post(ZAPIER_WEBHOOK_URL, req.body);
    console.log('Event forwarded to Zapier:', req.body);
  } catch (error) {
    console.error('Failed to forward event to Zapier:', error);
  }

  res.status(200).send('ok');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Slack Responder running on port ${port}`);
});
