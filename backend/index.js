const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

app.listen(3000, () => console.log('Backend listening on port 3000'));

