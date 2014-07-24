var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

//use "Client credentials flow" (Application-only authentication RFC 6749)
var clientId = '71ef43d609e047fdb69c51ea4e3541d0';
var clientSecret = 'fda2c4c85eed4563b045045b00188c49';
var redirectURI = 'http://www.example.com/test-callback';

//Create the API object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret,
  redirectURI : redirectURI,
});

//Print the credentials to the console
console.log('THESE ARE THE SPOTIFY API CREDENTIALS! ' + JSON.stringify(spotifyApi.getCredentials()), '\t');

//Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    console.log('THE ACCESS TOKEN EXPIRES IN! ' + data['expires_in']);
    console.log('THE ACCESS TOKEN IS! ' + data['access_token']);
    spotifyApi.setAccessToken( data ['access_token']);
    //Obtain playlists from a user
    return spotifyApi.getUserPlaylists('runningtalus');
  }).then(function (body) {
    console.log('RETRIEVED RUNNINGTALUS PLAYLISTS!' + JSON.stringify(body)
  )},
  function (err) {
    console.log('SOMETHING WENT WRONG WITH THE ACCESS TOKEN! ', err);
  });

var server = app.listen(6473, function() {
  console.log('Express server listening on port ' + server.address().port);
});