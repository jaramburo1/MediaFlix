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
    maxResults:20,
    type:"video"
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
   // $('#search-container').html('<pre>' + str + '</pre>');
    
    for(var i = 0; i < response.result.items.length; i++){
      var video = response.result.items[i].snippet;
		$('#search-container').append(
			"<div data-url='" + response.result.items[i].id.videoId +
      "'onclick='playVideo(this)' style='cursor:pointer;width:500px;'>" + video.title + 
      "<br />" + "<img src='" + video.thumbnails.medium.url + "' />" +
      "</div>"
		);
	}
  });
	
}

function playVideo(vid){
  var vidURL = vid.getAttribute("data-url");
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='https://www.youtube.com/embed/" + vidURL + "?autoplay=1' frameborder='0' allowfullscreen />");
}