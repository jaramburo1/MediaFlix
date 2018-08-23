// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  
  DM.api('/videos', {
  search: q,
  fields: 'title'
}, handleAPIResponse);
}

var handleAPIResponse = function(response) {
  //alert(response.list[0].title);
  for(var i = 0; i < response.list.length; i++){
      var video = response.list[i];
		$('#search-container').append(
			"<div data-url='" + video.videoId +
      "'onclick='playVideo(this)' style='cursor:pointer;width:500px;'>" + video.title + 
      "<br />" + "<img src='" + video.thumbnail_360_url + "' />" +
      "</div>"
		);
	}
};

function playVideo(vid){
  var vidURL = vid.getAttribute("data-url");
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='http://www.dailymotion.com/embed/video/" + vidURL + "?autoplay=1' frameborder='0' allowfullscreen />");
}