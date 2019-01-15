var request = require('request');
var authToken = require('./secrets.js')


function getRepoContributors(repoOwner, repoName, cb) {

    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'sumedhan',
            'Authorization': 'token ' + authToken.GITHUB_TOKEN
        }
    }
    request(options, function(err, res, body) {
        
        var content = JSON.parse(body);
        cb(err, content);
        });
}

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    result.forEach(function(contributor){
        console.log(contributor['avatar_url']);
    })
  });
