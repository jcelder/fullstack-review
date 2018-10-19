const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js').getReposByUsername
const saveRepo = require('../database/index.js').save
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  getReposByUsername(req.body.username)
    .then((repos) => JSON.parse(repos))
    .then((repos) => {
      let promiseArr = []
      for (let repo of repos) {
        promiseArr.push(saveRepo(repo))
      }
      return Promise.all(promiseArr)
    })
    .then((promiseArr) => {
      console.log(promiseArr);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

