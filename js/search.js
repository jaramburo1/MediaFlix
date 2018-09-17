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
	
	var vid = response.result.items[i];
	  vidURL = 'https://www.youtube.com/embed/' + vid.id.videoID;
	  video = {vid.id.videoID,vid.snippet.title,vidURL,vid.snippet.description,vid.snippet.thumbnails[medium].url,''};
	  videos.push(video);
	
    for (var i = 0; i < response.result.items.length; i++) {
      //var video = response.result.items[i];
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
      vid = response.items[i];
	  videos[i].duration = vid.contentDetails.duration;
      $('#results-container').append(
        "<div data-url='" + videos[i].id +
        "'onclick='playVideo(this)'>" +
        "<figure id='figure-search-results'>" +
        "<img src='" + videos[i].thumbnail + "' />" +
        "<figcaption>" + "<h3>" + videos[i].title + "</h3>" + videos[i].description + "(" + videos[i].duration + ")" + "</figcaption>" +
        "</figure>" +
        "</div>"
        );
    }
    });
  });
}

function playVideo(vid){
  var vidURL = vid.getAttribute("data-url");
  desc = videos.find((elem)=>{elem.id=vid});
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='https://www.youtube.com/embed/" + vidURL + "?autoplay=1' frameborder='0' allowfullscreen />");
  $('#feeds').html(desc);
}