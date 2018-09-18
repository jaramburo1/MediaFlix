// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  
  DM.api('/videos', {
  search: q,
  fields: 'id,title,thumbnail_240_url,description,duration,likes_total,views_total'
}, handleAPIResponse);
}

var handleAPIResponse = function(response) {
  //alert(response.list[0].title);
  $('#search-container').empty();
  console.log(response.list);
  for(var i = 0; i < response.list.length; i++){
      var video = response.list[i];
	  var thumbnail = video.thumbnail_240_url.substring(0,4) + "s" + video.thumbnail_240_url.substring(4,video.thumbnail_240_url.length);
	  console.log(thumbnail)
		$('#search-container').append(
			"<div data-url='" + video.id +
      "'onclick='playVideo(this)' style='cursor:pointer;width:500px;'>" + video.title + 
      "<br />" + "<img src='" + thumbnail + "' width='210px'/>" +
      "<br />" + "<p>" + video.description + "</p>" +
      "</div>"
		);
	}
};

function playVideo(vid){
  var vidURL = vid.getAttribute("data-url");
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='https://www.dailymotion.com/embed/video/" + vidURL + "?autoPlay=1' frameborder='0' allowfullscreen='' allow='autoplay' />");
}