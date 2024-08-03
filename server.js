const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();
const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;
const apiUrl = 'https://api.themoviedb.org/3';

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
  })
);

// Middleware Making the public folder static
app.use(express.static(path.join(__dirname, 'public')));

// Middleware Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Fetch API Data
app.get('/content', async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/${req.query.endpoint}?api_key=${apiKey}&language=en-US`
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Search API
app.get('/search', async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/search/${req.query.type}?api_key=${apiKey}&query=${
        req.query.searchTerm
      }&page=${+req.query.page}&language=en-US`
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// ----------------------
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
