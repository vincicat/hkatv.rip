var isMobile = (window.matchMedia('(max-device-width: 800px)').matches);

var myDataRef = new Firebase('https://atv-rip.firebaseio.com/messages');

var pendingMessages = [];

var lastMessageQuery = myDataRef.limitToLast(isMobile ? 25 : 100);
lastMessageQuery.on('child_added', function(snapshot) {
  var message = snapshot.val();
  pendingMessages.push(message.text);
});

setInterval(function () {
  var message = pendingMessages.shift();
  if (message) {
    displayChatMessage(message);
  }
}, 1000);

var marqueeHolder = $('#messages')[0];

function displayChatMessage(text) {
  var marqueeDiv = document.createElement('div');
  marqueeDiv.className = 'marquee';
  marqueeDiv.style.top = Math.floor(Math.random() * 90) + '%';
  marqueeDiv.style.fontSize = Math.floor(Math.random() * 4 + 3) + 'vmin';
  if (!isMobile) {
    marqueeDiv.style.animationDelay = Math.floor(Math.random() * 8) + 's';
    marqueeDiv.style.animationDuration = 15 + Math.floor(Math.random() * 4) * 3 + 's';
  }
  marqueeDiv.textContent = text;
  marqueeHolder.appendChild(marqueeDiv);
}

$('#name').val(localStorage.getItem('name'));
$('#name').on('input propertychange paste', function (e) {
  localStorage.setItem('name', $(this).val());
});

$('#message').on('keydown', function (e) {
  if (e.keyCode == 13) {
    var name = $('#name').val();
    var text = $('#message').val();
    if (name.length > 0 && text.length > 0) {
      myDataRef.push({ name: name, text: text });
      $('#message').val('');
    }
  }
});

