var makeDir = false,
    YQL = require('yql'),
    http = require('http'),
    fs = require('fs'),
    grab = function(url, file) {
        http.get(url, function(response) {
            response.pipe(file);
        });
    };

fs.stat('./imgs/', function(err) {
    if(err !== null) fs.mkdir('imgs');
});

new YQL.exec('select media:content from rss where url="http://imgur.com/r/earthporn/rss"', function(response) {
    var w, h, name, url, file, request,
        feed = response.query.results.item;
    for(var i = 0, j = feed.length; i < j; i++) {
        w = feed[i].content.width;
        h = feed[i].content.height;
        name = feed[i].content.url.substring(feed[i].content.url.lastIndexOf('/')+1);
        url = feed[i].content.url;
        if( w > h && w > 2000) {
            file = fs.createWriteStream('imgs/' + name);
            grab(url, file);
        }
    }
});
