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
	duration:''
};
 */
var videos = [];

// Search for a specified string.
function search() {
  videos.length = 0;
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
    $('#results-container').empty();
    for (var i = 0; i < response.items.length; i++) {
      vid = response.items[i];
      console.log(videos[i].id);
	  videos[i].duration = vid.contentDetails.duration;
    videos[i].ldescription = vid.snippet.description;
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
    });
  });
}

function playVideo(vid){
  var vidURL = vid.getAttribute("data-url");
  var desc = videos.find((elem)=>{return elem.id==vidURL;}).ldescription;
  //desc = $.parseHTML(desc);
  //desc = desc.replace(/href/g,'&lt;');
	  var exp = /(\b(https?|http|www|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var desc = desc.replace(exp, "<a href='$1' target='_blank'>$1</a>");
    
  console.log(desc);
  console.log("in playVideo funtion",vidURL);
  $('#player').html("<iframe width='560' height='315' src='https://www.youtube.com/embed/" + vidURL + "?autoplay=1' frameborder='0' allowfullscreen />");
  $('#feeds').html(`<pre><div style="text-align:left">${desc}</div></pre>`);
}