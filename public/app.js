var vid = document.getElementById("bgvid");

function vidFade() {
  vid.classList.add("stopfade");
}

vid.addEventListener('ended', function () {
  vid.pause();
  vidFade();
})
