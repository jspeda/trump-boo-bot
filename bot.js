var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
var trumpTwitter = 25073877;

var stream = T.stream('statuses/filter', { follow: trumpTwitter });

stream.on('tweet', tweetEvent);
function tweetEvent(event) {
  var id = event.id_str;
  var text = event.text;
  var user = event.user.screen_name;
  var userID = event.user.id;
  // figure out how to generate 'boo' with a random number of 'o's.
  var boo = booGenerator();
  if (userID === trumpTwitter) {
    console.log(text);
    var quotedTweet = boo + ' https://twitter.com/' + user + '/status/' + id;
    doATweet(quotedTweet);
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function booGenerator() {
  var booBegin = "b"
  for (var i = 0; i < getRandomInt(2, 10); i++) {
    booBegin+= "o"
  }
  return booBegin;
}

function doATweet(text) {
  var tweet = {
    status: text
  };
  T.post('statuses/update', tweet, tweeted);
  function tweeted(err, data, response) {
    if (err) {
      console.log('Uh oh!');
    }
    else {
      console.log('Looking good!');
    }
  }
}
