const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  if (req.body.type === 'url_verification') {
    return res.json({ challenge: req.body.challenge }); // <--- FIXED
  }
  
  console.log('Received event:', req.body);
  res.status(200).send('ok');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Slack Responder running on port ${port}`);
});
