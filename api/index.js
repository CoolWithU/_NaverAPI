const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Made By deepl');
});

app.get('/shorten', (req, res) => {
  var url = req.query.url;
  
  async function generate(link) {
    const resp = await fetch(
      `https://me2do.naver.com/common/requestJsonpV2.nhn?svcCode=0&url=https://link.naver.com/bridge?url=${link}`,
      { method: 'POST', headers: { Referer: 'link.naver.com' } },
    );
    
    const data = await resp.text();
    const json = JSON.parse(data.trim().slice(1, -1));
    const result = `{"result":{"data":"${json.result.httpsUrl}"}}`
    res.json(JSON.parse(result))
  };

  generate(url)
});

app.listen(port, () => {
  console.log(`Server listening`);
});

module.exports = app;
