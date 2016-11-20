var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var stream = T.stream('statuses/filter', { follow: 25073877 });

stream.on('tweet', tweetEvent);
function tweetEvent(event) {
  var id = event.id_str;
  var text = event.text;
  var user = event.user.screen_name;
  var boo = 
  console.log(text);
  var quotedTweet = boo + 'https://twitter.com/' + user + '/status/' + id;
  doATweet(quotedTweet);
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
