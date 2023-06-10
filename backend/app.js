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

// Get food history
app.get('/history', async (req, res) => {
  const response = await db.query('SELECT * FROM macros');

  const newArray = response.rows.sort((a, b) => a.date - b.date);
  console.log(newArray);
  res.json(newArray); // Array response of food entries alphabetized
});

// Insert food entry into DB
app.post('/macros', async (req, res) => {
  await db.query(
    'INSERT INTO macros (date, food, amount, protein, carbs, fat, kcal) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      req.body.date,
      req.body.food,
      req.body.amount,
      req.body.protein,
      req.body.carbs,
      req.body.fat,
      req.body.kcal,
    ]
  );

  res.send(201);
});

app.patch('/entry', async (req, res) => {
  console.log(req.body.amount, req.body.id);
  await db.query('UPDATE macros SET amount = $1 WHERE id = $2', [
    req.body.amount,
    req.body.id,
  ]);
  res.send('patchsucces');
});

app.delete('/delete', async (req, res) => {
  await db.query('DELETE FROM macros WHERE id = $1', [req.body.id]);
  res.send(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
