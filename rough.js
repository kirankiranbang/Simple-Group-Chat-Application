
const express = require('express');
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');

// Parse incoming request bodies
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login/add-log', (req, res, next) => {
  fs.readFile('message', (err, data) => {
    if (err) {
      console.log(err);
      data = 'no chat exists';
    }
    res.send(`
      ${data}
      <form action="/login" method="POST" onSubmit="document.getElementById('username'). value=localStorage.getItem('username')">
      <input type="text" id="username" name="username">  
      <input type="hidden" id="message" name="message">
        
        <button type="submit">LOGIN</button>
      </form>
    `);
  });
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const message = req.body.message;
  const data = username + ':' + message;

  fs.writeFile('message.txt', data, { flag: 'a' }, (err) => {
    if (err) {
      console.error('Error:', err);
    }
  });

  res.redirect('/');
});

module.exports = router;

