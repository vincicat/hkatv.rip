var myDataRef = new Firebase('https://atv-rip.firebaseio.com/messages');

var lastMessageQuery = myDataRef.endAt().limit(100)
lastMessageQuery.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
  $('#messages').append(
    '<div class="marquee" style="' +
      'top: ' + Math.floor(Math.random() * 90) + '%;' +
      'font-size: ' + Math.floor(Math.random() * 7 + 20) + 'pt;' +
      'animation-delay: ' + Math.floor(Math.random() * 15) + 's;' +
      'animation-duration: ' + Math.floor(Math.random() * 15 + 5) + 's;' +
    '">' + text + '</div>'
  );
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

