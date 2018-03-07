console.log("the twitter bot has started!");

// import packages
var Twit = require("twit");
var config = require("./config");

// extra: see it in a html page
var express = require("express");
var app = express();
var path = require("path");

// make use of it

// first thing to do with twitter is authenticate
// authenticate with a separate (secret) password file
var T = new Twit(config);

/* 
https://github.com/ttezel/twit

GET
search?
	by hastag
	by location
	by username
	by whatever

POST
tweeting!

STREAM
continuous connection (websockets)
	@mention
		everytime someone mentions me, tweet a reply
*/


// STREAM
var start_time = new Date();
var stream = T.stream('user');

// anytime someone follows me
stream.on('follow', thankyouTweet)

function thankyouTweet(eventMsg) {
	console.log(eventMsg)
	var name = eventMsg.source.name;
	var screen_name = eventMsg.source.screen_name;
	var thank_you = " I don't really like rainbows. ";
	var time_now = new Date();
	var diff = (time_now - start_time) / 1000;  //in seconds
	tweetIt('@' + screen_name + thank_you + "I've been waiting " + diff + 'seconds for you.');
}



// POST

function tweetIt(sentence) {

	var r = Math.floor(Math.random()*100);

	var tweet = {
		status: sentence,
	}

	function tweeted(err, data, response) {
		console.log('tweeted: ' + tweet.status);
	}

	T.post('statuses/update', tweet, tweeted);
}


//tweetIt();
//POST here
//setInterval(tweetIt, 1000*20);



// GET

//T.get('search/tweets', params, log_Data);

var params = {
	q : 'banana since:2015-01-01',
	count : 5
}

// err, data and response are the names of the things you can use
// inside the function (they are variables)
function log_Data(err, data, response) {
	console.log('-------------------------------------');
	console.log('got the reply from the GET request!\n');

	var output = [];
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
		var tweet = tweets[i];
		var user = tweet.user;

		var user_name = String(user.name);
		var user_twitter_name = String(user.screen_name);
		var user_location = String(user.location);
		var user_display_pic = String(user.profile_image_url_https);
		var retweet_counts = String(tweet.retweet_count);
		var user_id = String(tweet.id);
		var tweet_content = String(tweet.text);

		// see them in the console
		console.log('twitter user: ' + user_name);
		console.log('twitter account: ' + user_twitter_name);
		console.log('user location: ' + user_location);
		// user_display_pic = user.profile_image_url_https
		console.log('retweet counts: ' + retweet_counts);
		console.log('tweet id: ' + user_id);
		console.log('tweet: ' + tweet_content);
		console.log('');

		// append them to a main list with array.push()
		output.push({
			user_name,
			user_twitter_name,
			user_location,
			user_display_pic,
			retweet_counts,
			user_id,
			tweet_content
		});
	}
	return output;
}

