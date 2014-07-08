var fs = require('fs'),
    http = require('http'), 
    Twit = require('twit'),
    storeName = 'data.json',
    port = 8000;

var T = new Twit({
    consumer_key:         'CWrfRlao8XeGxNwYRpWF9GRZv'
  , consumer_secret:      'tHMt9pv9e353V0TZVzjwPPqcADLbgFXoW12UypYg4MwSTYRigm'
  , access_token:         '106597865-04mD0uiJkr0qgkYQJRTLCgFTBCpZX4mGJ0Fvf47x'
  , access_token_secret:  'mB3uBpp352zO6MLbdpjpBTr1uNwaD1L2bwYokmkJ7Qey7'
})

// tests if the tweets have images, then prints them out on the console
T.get('search/tweets', { q: 'foundersandcoders' }, function(err, data, response) {	
	
	var withMedia = function(item){
		return item.entities.media;
	}

	var newOrder = function(item){
		return {
			name: item.user.name,
			text: item.text,
			img: item.entities.media[0].media_url
		}
	}

	var rowJsonData = data.statuses.filter(withMedia).map(newOrder);

	var jsonData = { stuff: rowJsonData}

	fs.writeFile(storeName, JSON.stringify(jsonData, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + storeName);
	    }
	});
});

http.createServer(function (request, response){
 	fs.readFile("data.json", function (err, data) {
 		response.writeHead(200, {"Content-Type": "text/json"})
 		response.end(data)
	});
}).listen(port)
