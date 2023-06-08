require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT;
const db = require('./db');

app.use(cors());
app.use(express.json());

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

app.post('/macros', async (req, res) => {
  const { date, food, amount, protein, carbs, fat, kcal } = req.body;
  console.log(req.body);

  const query =
    'INSERT INTO macros (date, food, amount, protein, carbs, fat, kcal) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [date, food, amount, protein, carbs, fat, kcal];
  const response = db.query(query, values);

  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
