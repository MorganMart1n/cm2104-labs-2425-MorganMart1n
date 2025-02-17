var express = require('express');
var app = express();
var SpotifyWebAPI = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebAPI({
    clientId: 'df78c99a04bb42049d61e122b6a04c6b',
    clientSecret: 'c2e311083bfd4d4897a0bd919a2d187a'
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(function(data) {
    console.log('Access token received');
    spotifyApi.setAccessToken(data.body['access_token']);
}).catch(function(err) {
    console.log('Error getting access token:', err);
});

app.use(express.static('public'))

app.get('/', function(req, res){
    res.send("Hello world");
});

app.get('/searchLove', function (req, res){
    getTracks('love', res);
});

app.get('/search', function (req, res){
    var searchterm = req.query.searchterm;
    getTracks(searchterm, res);
})

app.get('/searchTop', function (req, res) {
    var artistId = req.query.artistId;  // Get the artist ID from the URL query parameter
    if (!artistId) {
        return res.status(400).send('Artist ID is required');
    }
    getTopTracks(artistId, res);
});

async function getTopTracks(artist, res){
    spotifyApi.getArtistTopTracks(artist, 'GB')
        .then(function (data){
            console.log(data.body)
        }, function (err){
            console.log('Somethiung went wong!', err);
        });
}

async function getTracks(searchterm, res) {
    if (!spotifyApi.getAccessToken()) {
        return res.status(401).send('No token provided');
    }

    spotifyApi.searchTracks(searchterm)
        .then(function (data) {
            var tracks = data.body.tracks.items

            var HTMLResponse = "";
            //loops through all items
            for(var i = 0; i< tracks.length;i++){

                var track = tracks[i];
                console.log(track.name);

                HTMLResponse = HTMLResponse+ "<div>"+
                "<h2>"+track.name+"</h2>"+
                "<h4>"+track.artists[0].name+"</h4>"+
                "<img src='"+track.album.images[0].url +"'>"+
                "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+
                "</div>";
                console.log(HTMLResponse);
            }
            res.send(HTMLResponse);
        }, function (err) {
            console.error(err);
        });
}

app.listen(8080);
