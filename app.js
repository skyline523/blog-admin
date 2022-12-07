const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const stats = require('./routes/stats');
const posts = require('./routes/posts');
const tags = require('./routes/tags');
const categories = require('./routes/categories');
const links = require('./routes/links');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/api/stats', stats);
app.use('/api/posts', posts);
app.use('/api/tags', tags);
app.use('/api/categories', categories);
app.use('/api/links', links);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server.`,
  });
});

module.exports = app;
