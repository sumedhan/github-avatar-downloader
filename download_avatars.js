var request = require('request');
var authToken = require('./secrets.js');
var fs = require('fs');

//This function gets the contributors for a given repository and parses an object to the call back function
function getRepoContributors(repoOwner, repoName, cb) {

    var options = {
        url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
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

function downloadImageByURL(url,filepath) {
    request.get(url)
    .on('error', function (err) {
        throw err;
    })
    .pipe(fs.createWriteStream(filepath));
}




var myArgs = process.argv.slice(2);
var repositoryOwner = myArgs[0];
var repository = myArgs[1];

if(repository && repositoryOwner) {
getRepoContributors(repositoryOwner, repository, function(err, result) {
    //Call back function declaration. The callback functions access the resulting object to access each contributor's avatar URL
    if(err) {
    console.log('Errors:', err);
    return 0;
    }
    result.forEach(function(contributor){
        var url = contributor['avatar_url'];
        var filepath = 'avatars/' + contributor.login + '.jpg';
        downloadImageByURL(url, filepath);
    })
    console.log("Downloaded images.");
});
} else {
    console.log("Error! Enter two arguments that specify the repo owner and repo name. Format: node download_avatar.js <owner> <repo>");
}