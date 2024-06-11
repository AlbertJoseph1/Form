const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Read existing data from JSON file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(dataFilePath));
};

// Write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Handle POST requests to /suggestions
app.post('/suggestions', (req, res) => {
  const { email, suggestion } = req.body;

  if (!email || !suggestion) {
    return res.status(400).json({ error: 'Email and suggestion are required' });
  }

  const data = readData();
  data.push({ email, suggestion, date: new Date().toISOString() });
  writeData(data);

  res.status(201).json({ message: 'Suggestion submitted successfully' });
});

// Handle GET requests to /suggestions (optional, for admin purposes)
app.get('/suggestions', (req, res) => {
  const data = readData();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
