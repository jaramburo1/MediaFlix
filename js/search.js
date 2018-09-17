// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}
var video = {
	id:'',
	title:'',
	videoURL:'',
	thumbnail:'',
	description:'',
	duration:''
};
var videos = [];
// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 20,
    type: "video"
  });
var videoIDs = '';
  request.execute(function (response) {
   // var str = JSON.stringify(response.result);
    
    $('#results-container').empty();
    for (var i = 0; i < response.result.items.length; i++) {
      var vid = response.result.items[i];
	  vidURL = 'https://www.youtube.com/embed/' + vid.id.videoID;
	  video = {vid.id.videoID,vid.snippet.title,vidURL,vid.snippet.description,vid.snippet.thumbnails[medium].url,''};
	  videos.push(video);
      if (i == response.result.items.length) { videoIDs += response.result.items[i].id.videoId; }
      else {
        videoIDs += response.result.items[i].id.videoId + ",";
      }
    }
    request = gapi.client.request({
          'method': 'GET',
          'path': '/youtube/v3/videos',
          'params':  {'id': videoIDs,
                 'part': 'snippet,contentDetails,statistics'}
      });
      request.execute(function(response){
    $('#results-container').empty();
    for (var i = 0; i < response.items.length; i++) {
      var vid = response.items[i];
	  videos[i].duration = vid.contentDetails.duration;
      document.write(// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}
var video = {
	id:'',
	title:'',
	videoURL:'',
	thumbnail:'',
	description:'',
	duration:''
};
var videos = [];
// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 20,
    type: "video"
  });
var videoIDs = '';
  request.execute(function (response) {
   // var str = JSON.stringify(response.result);
    
    $('#results-container').empty();
    for (var i = 0; i < response.result.items.length; i++) {
      var vid = response.result.items[i];
	  vidURL = 'https://www.youtube.com/embed/' + vid.id.videoID;
	  video = {vid.id.videoID,vid.snippet.title,vidURL,vid.snippet.description,vid.snippet.thumbnails[medium].url,''};
	  videos.push(video);
      if (i == response.result.items.length) { videoIDs += response.result.items[i].id.videoId; }
      else {
        videoIDs += response.result.items[i].id.videoId + ",";
      }
    }
    request = gapi.client.request({
          'method': 'GET',
          'path': '/youtube/v3/videos',
          'params':  {'id': videoIDs,
                 'part': 'snippet,contentDetails,statistics'}
      });
      request.execute(function(response){
    $('#results-container').empty();
    for (var i = 0; i < response.items.length; i++) {
      var vid = response.items[i];
	  videos[i].duration = vid.contentDetails.duration;
      document.write($('#results-container').append(
        `<div data-video="${video[i]}"
        onclick='playVideo(this)'>
        <figure id='figure-search-results'>
        <img src='${video.snippet.thumbnails.medium.url}' />
        <figcaption><h3>${video.snippet.title}</h3>${video.snippet.description} (${video.contentDetails.duration})</figcaption>
        </figure>
        </div>`
        ));
    }
    });
  });
}

function playVideo(vid){
  var vidURL = vid.videoURL;
  var vidDescription = vid.videoURL;
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='https://www.youtube.com/embed/" + vidURL + "?autoplay=1' frameborder='0' allowfullscreen />");
  $('#feeds').html("<p>" + vidDescription + "</p>");
}
















);
    }
    });
  });
}

function playVideo(vid){
  var vidURL = vid.videoURL;
  var vidDescription = vid.videoURL;
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='https://www.youtube.com/embed/" + vidURL + "?autoplay=1' frameborder='0' allowfullscreen />");
  $('#feeds').html("<p>" + vidDescription + "</p>");
}
















