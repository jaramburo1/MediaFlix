// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

var video = {};
/**
  var video = {
	id:'',
	title:'',
	videoURL:'',
	thumbnail:'',
	sdescription:'',
  ldescription:'',
	duration:'',
};
 */
var videos = new Array();

// Search for a specified string.
function search() {
  videos.length = 0;
  var q = $('#query').val();
  $('#results-container').empty();
// Youtube video search
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 20,
    type: "video"
  });

var videoIDs = '';
  request.execute(function (response) {
   // var str = JSON.stringify(response.result);
    
    for (var i = 0; i < response.result.items.length; i++) {
      var vid = response.result.items[i];
	  var vidURL = 'https://www.youtube.com/embed/' + vid.id.videoId;
	  video = {
      id:vid.id.videoId,
      title:vid.snippet.title,
      videoURL:vidURL,
      sdescription:vid.snippet.description,
      ldescription:'',
      thumbnail:vid.snippet.thumbnails.medium.url,
      duration:''
      };
	  videos.push(video);
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
    for (var i = 0; i < response.items.length; i++) {
      vid = response.items[i];
      
    //console.log(videos[i].duration);
	  videos[i].duration = vid.contentDetails.duration;
    videos[i].ldescription = vid.snippet.description;
    }
    });
    
  // Dailymotion video search
  DM.api('/videos', {
  search: q,
  fields: 'id,title,thumbnail_240_url,description,duration,likes_total,views_total,url'
}, (response) => {
  //alert(response.list[0].title);
  for(var i = 0; i < response.list.length; i++){
      var video = response.list[i];
	  var thumbnail = video.thumbnail_240_url.substring(0,4) + "s" + video.thumbnail_240_url.substring(4,video.thumbnail_240_url.length);
		  var vidURL = 'https://www.dailymotion.com/embed/video/' + video.id;
      var sdescription = video.description.substring(0,143);
		  video = {
		  id:video.id,
		  title:video.title,
		  videoURL:vidURL,
		  sdescription:sdescription,
		  ldescription:video.description,
		  thumbnail:thumbnail,
		  duration:video.duration
		  };
		  videos.push(video);
	}
  for(var i = 0; i < videos.length; i++){
    // Display search results
	$('#results-container').append(
        "<div data-url='" + videos[i].id + "'" +
        "onclick='playVideo(this)'>" +
        "<figure id='figure-search-results'>" +
        "<img src='" + videos[i].thumbnail + "' />" +
        "<figcaption>" + "<h3>" + videos[i].title + "</h3>" + videos[i].sdescription + "(" + videos[i].duration + ")" + "</figcaption>" +
        "</figure>" +
        "</div>"
        );
  }
  $('#results-container div').click(function(e){
  var $target = $('html,body');
  $target.animate({scrollTop: 0}, 1000);
});
  console.log(videos);
}
);
  });
}

function playVideo(vid){
  var vidURL = vid.getAttribute("data-url");
  var video = videos.find((elem)=>{return elem.id==vidURL;});
  //desc = $.parseHTML(desc);
  //desc = desc.replace(/href/g,'&lt;');
	  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var desc = video.ldescription.replace(exp, "<a href='$1' target='_blank'>$1</a>");
    
  //console.log(desc);
  //console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='" + video.videoURL + "?autoplay=1' frameborder='0' allowfullscreen />");
  $('#feeds').html("<pre><div style='text-align:left'>"+desc+"</div></pre>");
}