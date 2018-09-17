// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

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
      var video = response.items[i];
      $('#results-container').append(
        "<div data-url='" + video.id +
		"<div data-description='" + video.snippet.description +
        "'onclick='playVideo(this)'>" +
        "<figure id='figure-search-results'>" +
        "<img src='" + video.snippet.thumbnails.medium.url + "' />" +
        "<figcaption>" + "<h3>" + video.snippet.title + "</h3>" + video.snippet.description + "(" + video.contentDetails.duration + ")" + "</figcaption>" +
        "</figure>" +
        "</div>"
        );
    }
    });
  });
}

function playVideo(vid){
  var vidURL = vid.getAttribute("data-url");
  var vidDescription = vid.getAttribute("data-description");
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='https://www.youtube.com/embed/" + vidURL + "?autoplay=1' frameborder='0' allowfullscreen />");
  $('#player').html("<p>" + vidDescription + "</p>");
}
















