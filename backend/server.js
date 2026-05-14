const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();

const app = express();


app.use(cors({
  origin: true, // Allow all origins in development/production for easy debugging
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Auth API is running...' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server fully operational on port ${PORT}`);
  console.log(`Access locally at http://127.0.0.1:${PORT}`);
});
