require('dotenv').config();

const express = require('express');
var cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/search', async (req, res) => {
  const apiKey = process.env.FOODDATA_API_KEY;
  const query = req.query.q;

  const response = await axios.get(
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}&pageSize=200&dataType=Foundation, Survey (FNDDS)`
  );
  res.json(response.data);
});

app.get('/food', async (req, res) => {
  const apiKey = process.env.FOODDATA_API_KEY;
  const query = req.query.q;

  const response = await axios.get(
    `https://api.nal.usda.gov/fdc/v1/food/${query}?api_key=${apiKey}`
  );

  res.json(response.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
