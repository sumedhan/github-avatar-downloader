var request = require('request');
var authToken = require('./secrets.js');
var fs = require('fs');

//This function gets the contributors for a given repository and parses an object to the call back function
// function getRepoContributors(repoOwner, repoName, cb) {

//     var options = {
//         url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//         headers: {
//             'User-Agent': 'sumedhan',
//             'Authorization': 'token ' + authToken.GITHUB_TOKEN
//         }
//     }
//     request(options, function(err, res, body) {
        
//         var content = JSON.parse(body);
//         cb(err, content);
//         });
// }

// getRepoContributors("jquery", "jquery", function(err, result) {
//     //Call back function declaration. The callback functions access the resuly object to access each contributor's avatar URL
//     console.log("Errors:", err);
//     result.forEach(function(contributor){
//         console.log(contributor['avatar_url']);
//     })
// });

function downloadImageByURL(url,filepath) {
    request.get(url)
    .on('error', function (err) {
        throw err;
    })
    .pipe(fs.createWriteStream(filepath));
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466","./test/kv.jpg");
