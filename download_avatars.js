var request = require('request');
var githubToken = require('GITHUB_TOKEN')

function getRepoContributors(repoOwner, repoName, cb) {

    var options = {
        var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
        headers: {
            'User-Agent': 'sumedhan',
            'Authorization': githubToken
        }
    }
    request(url, function(err, res, body) {
        cb(err, body);
        });
}

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });
