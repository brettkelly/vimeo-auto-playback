/*
To Do:
1. Deal with multiple iframes. Don't just match the element type and assume it's a player.
2. Deal with multiple embedded players?
3. Handle page close/reload
*/
var iframe = document.querySelector("iframe");
if (!iframe) {
  console.log("No Vimeo player found");
} else {
  var player = new Vimeo.Player(iframe);
  var videoId;
  document.addEventListener("DOMContentLoaded", function () {
    player.getVideoId().then(function (vid) {
      videoId = vid;
      var pp = window.localStorage.getItem(videoId);
      if (pp) {
        player
          .setCurrentTime(pp)
          .then(function (seconds) {})
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  });

  player.on("pause", function () {
    player.getCurrentTime().then((time) => {
      window.localStorage.setItem(videoId, time);
    });
  });
}
