var Twit = require('twit');
// use following two lines for running locally. Or you can run 'heroku local' if using heroku.

// var config = require('./config');
// var T = new Twit(config);

var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret
});

var trumpTwitter = 25073877;

// listens for Trump Tweets and quotes them with a boo
var stream = T.stream('statuses/filter', { follow: trumpTwitter });

stream.on('tweet', tweetEvent);
function tweetEvent(event) {
  var id = event.id_str;
  var text = event.text;
  var user = event.user.screen_name;
  var userID = event.user.id;
  var boo = booGenerator();
  if (userID === trumpTwitter) {
    console.log(text);
    var quotedTweet = boo + ' https://twitter.com/' + user + '/status/' + id;
    doATweet(quotedTweet);
  }
}

// gets a random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// adds a user-specified number of 'o's to boo
function booGenerator() {
  var booBegin = "b"
  for (var i = 0; i < getRandomInt(2, 10); i++) {
    booBegin+= "o"
  }
  return booBegin;
}

// tweet function
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

// tweets on startup
doATweet("Starting up!");
