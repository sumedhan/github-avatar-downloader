var request = require('request');
var fs = require('fs');
require('dotenv').config();
const access_token = process.env.GITHUB_TOKEN;

//  Function that handles request errors 
function requestErrors (statusCode) {
    switch (statusCode) {
        case 200:
            // Status OK
            return 1;
        case 401: 
            // Authentication error
            if(!fs.existsSync('.env')){
            console.log(`Error ${status}! Please create a .env file. Refer .env.example`);
            } else if(access_token.length < 0) {
                console.log(`Error ${status}! Missing token in .env file`);
            } else {
            console.log(`Error ${status}! PLease provide a valid token in the .env file. Refer .env.example`);
            }
            return 0;
        case 404:
            // File not found
            console.log(`Error ${status}! Please check if you have provided a valid repo owner and name.`);
            return 0;
        default:
            //Any other error
            console.log('Error ${status}. Try again!');
            return 0;    
    }
}

//This function gets the contributors for a given repository and parses an object to the call back function
function getRepoContributors(repoOwner, repoName, cb) {

    var options = {
        url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        qs: {
            access_token: access_token
        },
        headers: {
            'User-Agent': 'sumedhan',
        }
    }
    request(options, function(err, res, body) {
        var content = JSON.parse(body);
        //Error handling for request failiures

        var status = res.statusCode;
        if(status) {
            cb(err, content);
        }
        });
}

// function downloads the contents of a url and stores it in the path specified
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

//Checks if argument have been passed
if(repository && repositoryOwner) {
getRepoContributors(repositoryOwner, repository, function(err, result) {
    //Call back function declaration. The callback functions access the resulting object to access each contributor's avatar URL
    if(err) {
    console.log('Errors:', err);
    return 0;
    }
    // Error handling if file path doesnt exist
    if(!fs.existsSync('avatars/')){
        fs.mkdirSync('avatars/');
    }
    console.log("Downloading....");
    result.forEach(function(contributor){
        var url = contributor['avatar_url'];
        var filepath = 'avatars/' + contributor.login + '.jpg';
        downloadImageByURL(url, filepath);
    });
});
} else {
    console.log("Error! Enter two arguments that specify the repo owner and repo name. Format: node download_avatar.js <owner> <repo>");
}