const express = require('express');
const axios = require('axios');
const https = require('https');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const pragmaticURL = 'https://51.79.129.134/storage-pragmatic?brands=rjz';
const pgsoftURL = 'https://51.79.129.134/storage-pgsoft?brands=rjz'
const microURL = 'https://51.79.129.134/storage-microgaming?brands=rjz'
const jokerURL = 'https://51.79.129.134/storage-joker?brands=rjz'
const habaneroURL = 'https://51.79.129.134/storage-habanero?brands=rjz'
const checkupURL = 'https://51.79.129.134/checkup?brands=rjz';
const winnerURL = 'https://51.79.129.134/winner-proxy';
const hotpragmaURL = 'https://51.79.129.134/hot-pragma-proxy';
const hotpgsoftURL = 'https://51.79.129.134/hot-pg-proxy';

const xnosleep = process.env.AUTHORIZATION;

app.use(cors());

app.get('/pragmatic', async (req, res) => {
  try {
    const { data } = await axios.get(pragmaticURL, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
          'x-api-token': xnosleep
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/pgsoft', async (req, res) => {
    try {
      const { data } = await axios.get(pgsoftURL, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            'x-api-token': xnosleep
        }
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
app.get('/microgaming', async (req, res) => {
    try {
      const { data } = await axios.get(microURL, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            'x-api-token': xnosleep
        }
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get('/joker', async (req, res) => {
    try {
      const { data } = await axios.get(jokerURL, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            'x-api-token': xnosleep
        }
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get('/habanero', async (req, res) => {
    try {
      const { data } = await axios.get(habaneroURL, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: {
            'x-api-token': xnosleep
        }
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


app.get('/checkup', async (req, res) => {
  try {
    const { data } = await axios.get(checkupURL, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
          'x-api-token': xnosleep
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/hotpragma', async (req, res) => {
  try {
    const { data } = await axios.get(hotpragmaURL, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
          'x-api-token': xnosleep
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/hotpgsoft', async (req, res) => {
  try {
    const { data } = await axios.get(hotpgsoftURL, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
          'x-api-token': xnosleep
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(process.env.PORT, () => console.log(`server is listening on ${port}`));