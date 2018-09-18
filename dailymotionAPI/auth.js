  window.dmAsyncInit = function()
  {
    DM.init({ apiKey: '28609fecadb89fda8f7c', status: true, cookie: true });
	handleAPILoaded();
	//
  };
  (function() {
    var e = document.createElement('script');
    e.async = true;
    e.src = 'all.js';

    var s = document.getElementsByTagName('script')[0];
    //s.parentNode.insertBefore(e, s);
  }());