const mongoose = require('mongoose');
const Promise = require('bluebird');
const mongoString = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';
mongoose.connect(mongoString);

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

  var repoInstance = new Repo(trimmedRepoObject);
  return new Promise((resolve, reject) => {
    repoInstance.save((err, newRepo) => {
      if (err) {
        if (err.code === 11000) {
          resolve('Record already exists');
        }
        console.log(err)
        reject(err);
      } else {
        resolve(newRepo);
      }
    });
  });
};

let getTop25ByCategory = (category) => {
  return Repo.find({})
    .limit(25)
    .sort({[category]: -1})
}

module.exports.save = save;
module.exports.getByCategory = getTop25ByCategory;