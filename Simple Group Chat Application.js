///create data.txt file for storing data sending as messege

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', (req, res, next) => {
  res.send(`
    <form action="/login/add-log" method="POST">
      <input type="text" id="username" name="username" placeholder="Enter your username">  
      <button type="submit">LOGIN</button>
    </form>
  `);
});

router.post('/login/add-log', (req, res, next) => {
  const username = req.body.username;
  res.redirect(`/chat/${encodeURIComponent(username)}`);
});

router.get('/chat/:username', (req, res, next) => {
  const username = req.params.username;
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error:', err);
      data = '';
    }
    res.send(`
      <h2>Welcome, ${username}!</h2>
      <div>${data}</div>
      <form action="/chat/${encodeURIComponent(username)}" method="POST">
        <input type="text" id="message" name="message" placeholder="Type your message">  
        <button type="submit">SEND</button>
      </form>
    `);
  });
});

router.post('/chat/:username', (req, res, next) => {
  const username = req.params.username;
  const message = req.body.message;
  const data = username + ': ' + message;

  fs.appendFile('data.txt', data + '\n', (err) => {
    if (err) {
      console.error('Error:', err);
    }
  });

  res.redirect(`/chat/${encodeURIComponent(username)}`);
});

app.use('/', router);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
