const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db.js');

// connect Database
connectDB();

// init middleware==
app.use(express.json({ extended: false }));

//define routes
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/posts', require('./routes/api/posts.js'));
app.use('/api/profile', require('./routes/api/profile.js'));
app.use('/api/auth', require('./routes/api/auth.js'));

app.get('/', (req, res) => {
  res.send('API running')
})

app.listen(PORT, () => {
  console.log(`what is life ${PORT}`);
});
