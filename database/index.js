const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  owner: String,
  avatarUrl: String,
  htmlUrl: String,
  description: String,
  size: Number,
  stars: Number,
  forks: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var trimmedRepoObject = {
    id: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    avatarUrl: repo.owner.avatar_url,
    htmlUrl: repo.html_url,
    description: repo.description,
    size: repo.size,
    stars: repo.stargazers_count,
    forks: repo.forks,
    watchers: repo.watchers
  };

  var newRepo = new Repo(trimmedRepoObject);
  return new Promise((resolve, reject) => {
    newRepo.save((err, newRepo) => {
      if (err && err.code !== 11000) {
        reject(err);
      } else if (err.code === 11000) {
        resolve('Record already exists');
      } else {
        resolve(newRepo);
      }
    });
  });
};


module.exports.save = save;